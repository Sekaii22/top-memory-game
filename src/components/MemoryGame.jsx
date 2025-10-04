import { useState, useEffect } from "react";

const cards = [
    {
        id: 1,
        name: "pikachu"
    },
    {
        id: 2,
        name: "charizard"
    },
    {
        id: 3,
        name: "ditto"
    },
    {
        id: 4,
        name: "lucario"
    },
    {
        id: 5,
        name: "greninja"
    },
    {
        id: 6,
        name: "rowlet"
    },
    {
        id: 7,
        name: "sylveon"
    },
    {
        id: 8,
        name: "garchomp"
    },
    {
        id: 9,
        name: "rayquaza"
    },
    {
        id: 10,
        name: "gengar"
    },
    {
        id: 11,
        name: "gardevoir"
    },
    {
        id: 12,
        name: "mewtwo"
    }
]

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
    const [playCards, setPlayCards] = useState(cards.slice(0, size));

    useEffect(() => {
        console.log("useEffect");
        for (const card of playCards) {
            const img = document.querySelector("#" + card.name);
            const url = "https://pokeapi.co/api/v2/pokemon/" + card.name;

            fetch(url)
                .then((response) => response.json())
                .then((obj) => {
                    const imageUrl = obj.sprites.other["official-artwork"]["front_default"];
                    img.src = imageUrl;
                });
        }
    }, []);

    function resetGame() {
        setSelectedIds(new Set());
        setPlayCards(cards.slice(0, size));
    }

    function handleClick(id,) {
        if (selectedIds.has(id)) {
            alert("You lose!!");
            resetGame();
            return;
        }

        if (selectedIds.size + 1 === playCards.length) {
            alert("You won!!");
            resetGame();
            return;
        }
                
        setSelectedIds(new Set([...selectedIds, id]));
        setPlayCards(getShuffledCards(playCards));
    }

    return (
        <>
            <div>
                <span className="score">Score: {selectedIds.size}/{playCards.length}</span>
            </div>
            <div className="card-container">
                {
                    playCards.map(card => (
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