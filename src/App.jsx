import React, { useState } from "react";
import {
  Play,
  Users,
  Zap,
  Smartphone,
  RotateCcw,
  Star,
  ArrowRight,
  GamepadIcon,
  Clock,
} from "lucide-react";
import Game from "./components/Game.jsx";

export default function App() {
  const [showGame, setShowGame] = useState(false);
  const [playAgainTrigger, setPlayAgainTrigger] = useState(false);
  const [scores, setScores] = useState({ player1: 0, player2: 0, ai: 0 });
  const [showDemo, setShowDemo] = useState(false);

  const handleWin = (winner, mode) => {
    setScores((prev) => {
      if (winner === "player1") return { ...prev, player1: prev.player1 + 1 };
      if (winner === "player2") return { ...prev, player2: prev.player2 + 1 };
      if (winner === "ai") return { ...prev, ai: prev.ai + 1 };
      return prev;
    });
  };

  const rules = [
    {
      icon: <Zap className="h-6 w-6 text-green-500" />,
      title: "Blink Rule",
      description:
        "Oldest move vanishes after every new move – keep your strategy dynamic!",
    },
    {
      icon: <Users className="h-6 w-6 text-green-500" />,
      title: "Two Modes",
      description: "Play against a friend (PvP) or challenge our AI in solo mode.",
    },
    {
      icon: <Star className="h-6 w-6 text-green-500" />,
      title: "Emoji Gameplay",
      description:
        "Choose from fun emoji categories to make every game expressive.",
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-green-500" />,
      title: "Win Logic",
      description:
        "Even if a win disappears, it's recorded and celebrated with animation.",
    },
  ];

  if (showGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <Game
          scores={scores}
          playAgainTrigger={playAgainTrigger}
          onWin={handleWin}
          onPlayAgain={() => setPlayAgainTrigger((prev) => !prev)}
          onBack={() => {
            setShowGame(false);
            setScores({ player1: 0, player2: 0, ai: 0 });
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-6">
            <div className="inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-medium">
              🎮 Now Playing: Emoji Clash
            </div>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            <span className="bg-[var(--color-primary)] bg-clip-text text-transparent">
              Emoji Clash
            </span>
            <br />
            <span className="text-gray-500">
              Play Emoji Clash Like Never Before
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 md:text-2xl">
            Experience a fun twist on the classic game. Blinking tiles, emoji
            madness, and smart win tracking!
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => setShowGame(true)}
              className="group inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-8 py-4 text-lg font-semibold text-white hover:bg-[var(--color-primary-dull)]"
            >
              <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Play Now - It’s Free!
            </button>

            <button
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-8 py-4 text-lg font-semibold text-gray-800 hover:bg-gray-100"
              onClick={() => setShowDemo(true)}
            >
              <GamepadIcon className="mr-2 h-5 w-5" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-500 md:text-5xl">
              How to Play
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Emoji Clash introduces innovative rules to keep you on your toes.
              Here's what makes it different:
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            {rules.map((rule, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-md transition hover:shadow-xl"
              >
                <div className="rounded-full bg-blue-100 p-2">{rule.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {rule.title}
                  </h3>
                  <p className="mt-1 text-gray-600">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-3xl bg-[var(--color-primary)] p-12 text-white">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">Ready to Clash?</h2>
            <p className="mb-8 text-xl opacity-90">
              Start your game now and discover the fun of vanishing moves and
              emoji wars!
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={() => setShowGame(true)}
                className="group inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[var(--color-primary)] hover:bg-gray-100"
              >
                <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110 " />
                Start Playing Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-75">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                No download required
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Works on all devices
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                100% Free
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowDemo(false)}
            >
              ✕
            </button>
            <video controls className="w-full rounded" src="/demo.mp4" />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className=" bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-4 text-2xl font-bold bg-[var(--color-primary)] bg-clip-text text-transparent">
            Emoji Clash
          </div>
          <p className="text-gray-600">
            Built with React, and modern web technologies
          </p>
          <div className="mt-4 text-sm text-gray-500">
            © 2024 Emoji Clash. Made with 💚 for players who love a twist.
          </div>
        </div>
      </footer>
    </div>
  );
}
