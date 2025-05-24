// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import {
//   Play,
//   Trophy,
//   Smartphone,
//   Star,
//   ArrowRight,
//   GamepadIcon,
//   Clock,
//   Zap,
// } from "lucide-react"

// export default function LandingPage({ onStart }: { onStart: () => void }) {
//   const stats = [
//     { number: "1M+", label: "Games Played" },
//     { number: "50K+", label: "Happy Players" },
//     { number: "4.9★", label: "User Rating" },
//     { number: "0ms", label: "Load Time" },
//   ]

//   const gameRules = `
// 🧩 1. Game Board
// - 3x3 grid, classic style.
// - Max 3 active emojis per player.

// 😎 2. Emoji Categories
// - Choose before game starts.
// - Moves are random from selected category.

// 🔁 3. Turn-Based Play
// - Player 1 starts, then Player 2 or AI.
// - Click a cell to place emoji.

// 💨 4. Vanishing Rule
// - 4th move removes oldest emoji.

// 🏆 5. Winning Condition
// - Align 3 emojis to win.
// - Winning line animates.

// 🧼 6. Game End & Reset
// - Options: 🔁 Play Again or 🔙 Back to Start

// 💡 7. Modes
// - PvP or AI.
//   `

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden px-4 py-20">
//         <div className="mx-auto max-w-6xl text-center">
//           <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
//             🎮 Now Playing: Modern Tic Tac Toe
//           </Badge>

//           <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
//             <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Blink Tac Toe
//             </span>
//             <br />
//             <span className="text-gray-800">Reimagined</span>
//           </h1>

//           <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 md:text-2xl">
//             A twist on the classic — vanish moves, emoji fun, and beautiful UI.
//           </p>

//           <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
//             <Button
//               onClick={onStart}
//               size="lg"
//               className="group bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold hover:from-blue-700 hover:to-purple-700"
//             >
//               <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
//               Play Now - It's Free!
//             </Button>
//             <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
//               <GamepadIcon className="mr-2 h-5 w-5" />
//               Watch Demo
//             </Button>
//           </div>

//           {/* Stats */}
//           <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-3xl font-bold text-gray-800 md:text-4xl">{stat.number}</div>
//                 <div className="text-sm text-gray-600 md:text-base">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Floating Game Preview */}
//         <div className="absolute right-10 top-20 hidden rotate-12 transform lg:block">
//           <div className="rounded-2xl bg-white p-4 shadow-2xl">
//             <div className="grid grid-cols-3 gap-2">
//               {Array.from({ length: 9 }, (_, i) => (
//                 <div
//                   key={i}
//                   className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-gray-200 bg-gray-50 text-lg font-bold"
//                 >
//                   {i === 0 ? "X" : i === 4 ? "O" : i === 8 ? "X" : ""}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Rules Section */}
//       <section className="px-4 py-20">
//         <div className="mx-auto max-w-4xl text-center">
//           <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">Game Rules</h2>
//           <p className="mb-12 text-xl text-gray-600">Understand how to master Blink Tac Toe.</p>
//           <div className="rounded-xl bg-white p-6 text-left shadow-xl font-mono text-sm text-gray-800 whitespace-pre-wrap">
//             {gameRules}
//           </div>
//         </div>
//       </section>

//       {/* Game Preview Section */}
//       <section className="px-4 py-20">
//         <div className="mx-auto max-w-4xl text-center">
//           <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">See It In Action</h2>
//           <p className="mb-12 text-xl text-gray-600">Beautiful design meets classic gameplay</p>

//           <div className="relative mx-auto max-w-md">
//             <div className="rounded-3xl bg-white p-8 shadow-2xl">
//               <div className="mb-6 flex items-center justify-between rounded-lg bg-gray-50 p-4">
//                 <span className="text-sm text-gray-600">Next player:</span>
//                 <Badge className="bg-blue-600">X</Badge>
//               </div>

//               <div className="grid grid-cols-3 gap-3">
//                 {["X", "", "O", "", "X", "", "O", "", "X"].map((val, i) => (
//                   <div
//                     key={i}
//                     className={`aspect-square flex items-center justify-center rounded-xl border-2 text-2xl font-bold transition-all ${
//                       i === 8 ? "border-green-400 bg-green-50 text-green-600" : "border-gray-200 bg-white"
//                     } ${val === "X" ? "text-blue-600" : val === "O" ? "text-red-500" : ""}`}
//                   >
//                     {val}
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-6 flex items-center justify-center gap-2 text-green-600">
//                 <Trophy className="h-5 w-5" />
//                 <span className="font-semibold">Player X wins!</span>
//               </div>
//             </div>

//             {/* Floating emojis */}
//             <div className="absolute -right-4 -top-4 rounded-full bg-yellow-400 p-3 shadow-lg">
//               <Star className="h-6 w-6 text-yellow-800" />
//             </div>
//             <div className="absolute -bottom-4 -left-4 rounded-full bg-green-400 p-3 shadow-lg">
//               <Zap className="h-6 w-6 text-green-800" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="px-4 py-20">
//         <div className="mx-auto max-w-4xl text-center">
//           <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-white">
//             <h2 className="mb-4 text-4xl font-bold md:text-5xl">Ready to Play?</h2>
//             <p className="mb-8 text-xl opacity-90">
//               Join thousands of players enjoying the most beautiful tic-tac-toe experience ever created.
//             </p>

//             <Button
//               onClick={onStart}
//               size="lg"
//               className="group bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100"
//             >
//               <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
//               Start Playing Now
//               <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//             </Button>

//             <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-75">
//               <div className="flex items-center gap-2">
//                 <Clock className="h-4 w-4" />
//                 No download required
//               </div>
//               <div className="flex items-center gap-2">
//                 <Smartphone className="h-4 w-4" />
//                 Works on all devices
//               </div>
//               <div className="flex items-center gap-2">
//                 <Star className="h-4 w-4" />
//                 100% Free
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t bg-white px-4 py-12">
//         <div className="mx-auto max-w-6xl text-center">
//           <div className="mb-4 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             Modern Tic Tac Toe
//           </div>
//           <p className="text-gray-600">Built with React, TypeScript, and modern web technologies</p>
//           <div className="mt-4 text-sm text-gray-500">
//             © 2024 Modern Tic Tac Toe. Made with ❤️ for game lovers everywhere.
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }
