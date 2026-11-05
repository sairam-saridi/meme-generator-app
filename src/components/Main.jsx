import { useState, useEffect } from  "react"

export default function Main()
{
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "https://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage()
    {
        const randomIndex = Math.floor(Math.random() * allMemes.length)
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: allMemes[randomIndex].url
        }))
    }

    function handleChange(event)
    {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input type="text"
                           placeholder="one does not simply"
                           name="topText"
                           onChange={handleChange}
                           value={meme.topText}
                    />
                </label>
                <label> Bottom Text
                    <input type="text"
                           placeholder="walk into morder"
                            name="bottomText"
                            onChange={handleChange}
                            value={meme.bottomText}
                    />
                </label>
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                    <img src={meme.imageUrl} alt="meme" />
                    <span className="top">{meme.topText}</span>
                    <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}