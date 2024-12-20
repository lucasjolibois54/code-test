import { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';

interface Transcript {
  type: 'user' | 'assistant' | 'system';
  text: string;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  length: number;
  isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  start(): void;
  stop(): void;
}

declare global {
  interface Window {
    SpeechRecognition?: { new (): SpeechRecognition };
    webkitSpeechRecognition?: { new (): SpeechRecognition };
  }
}

function App() {
  const [joke, setJoke] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const fetchJoke = useCallback(async (query = ''): Promise<string> => {
    const url = query
      ? `https://icanhazdadjoke.com/search?term=${encodeURIComponent(query)}`
      : 'https://icanhazdadjoke.com/';

    try {
      const res = await axios.get(url, { headers: { Accept: 'application/json' } });
      if (query) {
        const jokes = res.data.results;
        return jokes.length > 0
          ? jokes[Math.floor(Math.random() * jokes.length)].joke
          : "Sorry, I can't come up with a joke for that! Any other ideas?";
      } else {
        return res.data.joke;
      }
    } catch (err) {
      console.error(err);
      return "Sorry, I couldn't fetch a joke at the moment.";
    }
  }, []);

  const speak = useCallback((text: string): void => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleVoiceCommand = useCallback(async (command: string) => {
    const normalizedCommand = command.toLowerCase();
    setTranscripts(prev => [...prev, { type: 'user', text: command }]);

    setLoading(true);
    let response: string;

    if (normalizedCommand.includes('tell me a joke about')) {
      const topic = normalizedCommand.replace('tell me a joke about', '').trim();
      response = await fetchJoke(topic);
    } else if (
      normalizedCommand.includes('tell me a joke') ||
      normalizedCommand.includes('say another one')
    ) {
      response = await fetchJoke();
    } else {
      response = "Sorry, I didn't understand that. Please say 'Tell me a joke' or 'Tell me a joke about ...'";
    }

    setJoke(response);
    speak(response);
    setTranscripts(prev => [...prev, { type: 'assistant', text: response }]);
    setLoading(false);
  }, [fetchJoke, speak]);

  const startListening = useCallback(() => {
    setListening(true);
    setError(null);

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      setError("Sorry, your browser doesn't support speech recognition.");
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      setTranscripts(prev => [...prev, { type: 'system', text: 'Listening...' }]);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setListening(false);
      void handleVoiceCommand(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
      if (event.error === 'no-speech') {
        const errorMessage = "I didn't hear anything. Please try again.";
        setError(errorMessage);
        speak(errorMessage);
        setTranscripts(prev => [...prev, { type: 'system', text: "No speech detected. Please try again." }]);
      } else {
        setError("I'm having trouble hearing you. Please try again.");
        setTranscripts(prev => [...prev, { type: 'system', text: `Error: ${event.error}. Please try again.` }]);
      }
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  }, [handleVoiceCommand, speak]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  }, []);

  useEffect(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      setError("Sorry, your browser doesn't support speech recognition.");
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="min-h-screen text-[#18181b] flex">
      <div className={`flex-1 flex flex-col items-center justify-center p-4 transition-all duration-300 ${sidebarOpen ? 'md:mr-80' : ''}`}>
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-center mb-8">Voice Joke Teller</h1>
          <div className="bg-[#ffffff] rounded-lg shadow-md overflow-hidden border border-[#e4e4e7] mb-4">
            <div className="p-6">
              <button
                onClick={listening ? stopListening : startListening}
                disabled={loading}
                className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                  loading || listening
                    ? 'bg-[#e4e4e7] text-[#71717a] cursor-not-allowed'
                    : 'bg-[#000000] text-white hover:bg-[#333333]'
                }`}
              >
                {listening ? 'Listening...' : 'Speak'}
              </button>
              {loading && (
                <div className="flex justify-center items-center mt-6">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0284c7]" />
                </div>
              )}
              {error && <p className="text-[#dc2626] text-center mt-4">{error}</p>}
              {joke && <p className="text-lg text-center mt-6">{joke}</p>}
              {!joke && !loading && !error && (
                <p className="text-center text-[#71717a] mt-6">
                  Click 'Speak' and say "Tell me a joke" or "Tell me a joke about ..."
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full py-2 px-4 bg-[#e4e4e7] text-[#18181b] rounded-md text-sm font-medium hover:bg-[#d4d4d8] transition-colors duration-200"
          >
            {sidebarOpen ? "Close Transcript" : "View Transcript"}
          </button>
        </div>
      </div>

      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full md:w-80 bg-[#ffffff] border-l border-[#e4e4e7] transform ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-[#e4e4e7]">
            <h2 className="text-lg font-semibold text-[#18181b]">Transcripts</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-[#71717a] hover:text-[#18181b] rounded-sm"
              aria-label="Close sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {transcripts.map((transcript, index) => (
              <div
                key={index}
                className={`p-3 rounded-md flex items-start space-x-3 ${
                  transcript.type === 'user' ? 'bg-[#f4f4f5]' : 
                  transcript.type === 'assistant' ? 'bg-[#0284c7]/10' : 'bg-[#e4e4e7]'
                }`}
              >
                <span className="mt-0.5">
                  {transcript.type === 'user' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  ) : transcript.type === 'assistant' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </span>
                <div className="flex-1 text-[#18181b]">
                  <p className="font-medium mb-1">
                    {transcript.type === 'user' ? 'You' : 
                     transcript.type === 'assistant' ? 'Joke' : 'System'}
                  </p>
                  <p className="text-sm">{transcript.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
