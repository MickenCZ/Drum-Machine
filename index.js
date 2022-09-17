import React, {useState, useRef, useEffect, useCallback} from "https://cdn.skypack.dev/react@17.0.1"
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

function DrumPad({id, sound, power, volume, setMsg}) {
  const audioRef = useRef()
  const play = useCallback(() => {
    audioRef.current.volume = parseFloat(volume)
    audioRef.current.play()
    if (power) {setMsg(sound[1])}
  }, [setMsg, sound, volume, power])

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === id.toLowerCase() || e.key === id) {
        play(audioRef)
      }
    }
    
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [id, play])
  return (<button className='drum-pad' onClick={() => {play(audioRef)}} id={sound[1]}>{id}
    <audio className='clip' id={id} src={power ? sound[0] : "#"} ref={audioRef}></audio>
  </button>)
}

function App() {
  const sounds =  {
    "Q1":["https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3","Chord 1"],
    "W1":["https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3","Chord 2"],
    "E1":["https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3", "Chord 3"],
    "A1":["https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3", "Shaker"],
    "S1":["https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3", "Open HH"],
    "D1":["https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3", "Closed HH"],
    "Z1":["https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", "Punchy Kick"],
    "X1":["https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3", "Side Stick"],
    "C1":["https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3", "Snare"],
    "Q2":["https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3","Heater 1"],
    "W2":["https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", "Heater 2"],
    "E2":["https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", "Heater 3"],
    "A2":["https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", "Heater 4"],
    "S2":["https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", "Clap"],
    "D2":["https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", "Open HH"],
    "Z2":["https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", "Kick n' hat"],
    "X2":["https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", "Kick"],
    "C2":["https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", "Closed HH"],
 }
  const [volume, setVolume] = useState("0.3")
  const [power, setPower] = useState(true)
  const [bank, setBank] = useState(true) // true - piano, false - heater
  const [msg, setMsg] = useState("");
  return (<div id="background">
  <main id="drum-machine">
    <section id="drumKeys">
      <DrumPad id="Q" sound={sounds[bank ? "Q1" : "Q2"]} power={power} volume={volume} setMsg={setMsg} />
      <DrumPad id="W" sound={sounds[bank ? "W1" : "W2"]} power={power} volume={volume} setMsg={setMsg} />
      <DrumPad id="E" sound={sounds[bank ? "E1" : "E2"]} power={power} volume={volume} setMsg={setMsg} />
      <DrumPad id="A" sound={sounds[bank ? "A1" : "A2"]} power={power} volume={volume} setMsg={setMsg} />
      <DrumPad id="S" sound={sounds[bank ? "S1" : "S2"]} power={power} volume={volume} setMsg={setMsg} />
      <DrumPad id="D" sound={sounds[bank ? "D1" : "D2"]} power={power} volume={volume} setMsg={setMsg} />
      <DrumPad id="Z" sound={sounds[bank ? "Z1" : "Z2"]} power={power} volume={volume} setMsg={setMsg} />
      <DrumPad id="X" sound={sounds[bank ? "X1" : "X2"]} power={power} volume={volume} setMsg={setMsg} />
      <DrumPad id="C" sound={sounds[bank ? "C1" : "C2"]} power={power} volume={volume} setMsg={setMsg} />
    </section>
    <section id="controls">
      <div id="power-header">Power</div>
      <label className="switch" id="power">
          <input type="checkbox" checked={power} onChange={e => {
            setPower(prevState => !prevState)
            setMsg("")
            }} />
          <span className="slider"></span>
      </label>
      <span id="display">{msg}</span>
      <input type="range" step="0.01" min="0" max="1" value={volume} id="volume" onChange={e => {setVolume(e.target.value)}} />
      <div id="kitSelectHeader">Bank</div>
      <label className="switch" id="kitselect">
          <input type="checkbox" checked={bank} onChange={() => {
            if (power) {setMsg(bank ? "Heater Kit" : "Smooth Piano Kit")}
            setBank(!bank)
            }} />
          <span className="slider"></span>
      </label>
    </section>
  </main>
  </div>)
}