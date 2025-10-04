import { useState, useEffect, useRef } from "react";
import { cards } from "../data";

function getShuffledCards(cards) {
    const shuffled = [...cards];
    let currentIndex = shuffled.length;;

    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }

    return shuffled;
}

export default function MemoryGame({size=12}) {
    const [selectedIds, setSelectedIds] = useState(new Set());
    const playCards = useRef(cards.slice(0, size));

    useEffect(() => {
        let ignore = false;

        for (const card of playCards.current) {
            const img = document.querySelector("#" + card.name);
            const url = "https://pokeapi.co/api/v2/pokemon/" + card.name;
            
            fetch(url)
                .then((response) => {
                    if (!ignore)
                        return response.json()
                })
                .then((obj) => {
                    if (!ignore) {
                        const imageUrl = obj.sprites.other["official-artwork"]["front_default"];
                        img.src = imageUrl;
                    }
                });
        }

        return () => {
            ignore = true;
        };
    }, []);

    function resetGame() {
        setSelectedIds(new Set());
        playCards.current = cards.slice(0, size);
    }

    function handleClick(id,) {
        if (selectedIds.has(id)) {
            alert("You lose!!");
            resetGame();
            return;
        }

        if (selectedIds.size + 1 === playCards.current.length) {
            alert("You won!!");
            resetGame();
            return;
        }
                
        setSelectedIds(new Set([...selectedIds, id]));
        playCards.current = getShuffledCards(playCards.current);
    }

    return (
        <>
            <div>
                <span className="score">Score: {selectedIds.size}/{playCards.current.length}</span>
            </div>
            <div className="card-container">
                {
                    playCards.current.map(card => (
                        <button 
                            className="card" 
                            key={card.id} 
                            onClick={() => handleClick(card.id)}
                        >
                            <img id={card.name}/>
                            <p>{card.name[0].toUpperCase() + card.name.slice(1)}</p>
                        </button>
                    ))
                }
            </div>
        </>
        
    );
}