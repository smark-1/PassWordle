# PassWordle

PassWordle is a word-guessing game inspired by Wordle, but with the most common passwords! Try to guess the secret password in a limited number of attempts. Each guess provides feedback to help you crack the code.

> ⚠️ **Warning:** This game uses the most common passwords found on the internet. If you recognize your own password in here, consider this your friendly (and slightly judgmental) reminder to change it immediately. Seriously, "password123" is not fooling anyone!

## How to Play

- Each round, you must guess the secret password.
- After each guess, you'll receive hints:
  - Correct letters in the correct position.
  - Correct letters in the wrong position.
  - Incorrect letters.
- Use the feedback to improve your next guess.
- You have a limited number of attempts to solve the password.

## Getting Started

### Prerequisites

- Node.js (recommended v16+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/smark-1/passwordle.git
   cd passwordle
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

## Credits

Inspired by [Wordle](https://www.nytimes.com/games/wordle).
