import React, { useState } from "react"
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
} from "lucide-react"
import Game from "./components/Game.jsx" 
import { div } from "framer-motion/client";

export default function App() {
  const [showGame, setShowGame] = useState(false);
  const [playAgainTrigger, setPlayAgainTrigger] = useState(false);

  const rules = [
    {
      icon: <Zap className="h-6 w-6 text-green-500" />,
      title: "Blink Rule",
      description: "Oldest move vanishes after every new move – keep your strategy dynamic!",
    },
    {
      icon: <Users className="h-6 w-6 text-green-500" />,
      title: "Two Modes",
      description: "Play against a friend (PvP) or challenge our AI in solo mode.",
    },
    {
      icon: <Star className="h-6 w-6 text-green-500" />,
      title: "Emoji Gameplay",
      description: "Choose from fun emoji categories to make every game expressive.",
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-green-500" />,
      title: "Win Logic",
      description: "Even if a win disappears, it's recorded and celebrated with animation.",
    },
  ]

  if (showGame) {
    return (
      <div  className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
          <Game
          playAgainTrigger={playAgainTrigger}
          onPlayAgain={() => setPlayAgainTrigger(prev => !prev)}
          onBack={() => setShowGame(false)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-6">
            <div className="inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-medium">
              🎮 Now Playing: Blink Tac Toe
            </div>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            <span className="bg-[var(--color-primary)] bg-clip-text text-transparent">
              Blink Tac Toe
            </span>
            <br />
            <span className="text-gray-500">Play Tic Tac Toe Like Never Before</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 md:text-2xl">
            Experience a fun twist on the classic game. Blinking tiles, emoji madness, and smart win tracking!
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => setShowGame(true)}
              className="group inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-8 py-4 text-lg font-semibold text-white hover:bg-[var(--color-primary-dull)]"
            >
              <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Play Now - It’s Free!
            </button>

            <button className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-8 py-4 text-lg font-semibold text-gray-800 hover:bg-gray-100">
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
            <h2 className="mb-4 text-4xl font-bold text-gray-500 md:text-5xl">How to Play</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Blink Tac Toe introduces innovative rules to keep you on your toes. Here's what makes it different:
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
                  <h3 className="text-xl font-semibold text-gray-800">{rule.title}</h3>
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
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">Ready to Blink?</h2>
            <p className="mb-8 text-xl opacity-90">
              Start your game now and discover the fun of vanishing moves and emoji wars!
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={() => setShowGame(true)}
                className="group inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[var(--color-primary)] hover:bg-gray-100"
              >
                <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
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

      {/* Footer */}
      <footer className="border-t bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-4 text-2xl font-bold bg-[var(--color-primary)] bg-clip-text text-transparent">
            Blink Tac Toe
          </div>
          <p className="text-gray-600">Built with React, and modern web technologies</p>
          <div className="mt-4 text-sm text-gray-500">
            © 2024 Blink Tac Toe. Made with 💚 for players who love a twist.
          </div>
        </div>
      </footer>
    </div>
  )
}
