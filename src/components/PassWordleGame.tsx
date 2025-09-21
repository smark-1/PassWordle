import {useEffect, useState} from "react";
import PassWordle from "./PassWordle.tsx";

function getRandomFromArray<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Filter passwords 8-16 chars with at least one letter
function filterPasswords(passwords: string[]): string[] {
    const regex = /^(?=.*[A-Za-z]).{8,16}$/;
    return passwords.filter((p) => regex.test(p));
}

const PassWordleGame: React.FC = () => {
    const [answer, setAnswer] = useState<string | null>(null);
    const [passwords, setPasswords] = useState<string[]>([]);
    const [gameKey, setGameKey] = useState(0);

    useEffect(() => {
        async function fetchPasswords() {
            try {
                const res = await fetch(
                    "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/Common-Credentials/10k-most-common.txt"
                );
                const text = await res.text();
                const words = text
                    .split("\n")
                    .map((w) => w.trim())
                    .filter(Boolean);
                const filtered = filterPasswords(words);

                setPasswords(filtered);
                setAnswer(getRandomFromArray(filtered).toLowerCase());
            } catch (err) {
                console.error("Failed to fetch passwords:", err);
            }
        }

        fetchPasswords();
    }, []);

    function handleRestart() {
        if (passwords.length === 0) return;
        setAnswer(getRandomFromArray(passwords).toLowerCase());
        setGameKey((prev) => prev + 1);
    }

    if (!answer) return <div>Loading...</div>;

    return <PassWordle answer={answer} onRestart={handleRestart} key={gameKey} />;
};

export default PassWordleGame;