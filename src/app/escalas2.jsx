import React, {useState} from 'react'

const Escalas = () =>{
    //styles
    const columnDisp = {
        display: 'flex',
        flexDirection: 'column',
        width: '452px'
    }
    
    const [Escala, setEscala] = useState('')
    const [nota, setNota] = useState('')
    const [acordes, setAcordes] = useState('')
    // Do, Do#, Re, Re#, Mi, Fa, Fa#, Sol, Sol#, La, La# y Si
    const AcordesSostenido = ["Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"]
    const AcordesBemol = ["Do", "Reb", "Re", "Mib", "Mi", "Fa", "Solb", "Sol", "Lab", "La", "Sib", "Si"]
    const Acordes = []
    const pos = []
    const calidadAcor = []
    const dict = [{key: 3, value: "Tercera menor"},
                {key: 4, value: "Tercera mayor"}]

    const capitalized = (str) =>{
        const lower = str.toLowerCase()
        return str.charAt(0).toUpperCase() + lower.slice(1)
    }


    const handleClick = (event) => { 
        const {id} = event.currentTarget.dataset
        const notaActual = nota
        if(id === 'Escalas#'){
            const size = AcordesSostenido.length
            const posicion = AcordesSostenido.indexOf(notaActual)
            const notasFinales = AcordesSostenido[posicion] + ' ' + AcordesSostenido[(posicion + 2)% size] + ' ' + AcordesSostenido[(posicion + 4)% size] + ' ' + AcordesSostenido[(posicion + 5)% size] + ' ' + AcordesSostenido[(posicion + 7)% size] + ' ' + AcordesSostenido[(posicion + 9)% size] + ' ' + AcordesSostenido[(posicion + 11)% size] + ' ' + AcordesSostenido[(posicion + 12)% size]  
            pos.push(posicion, (posicion + 2), (posicion + 4), (posicion + 5), (posicion + 7), (posicion + 9), (posicion + 11), (posicion + 12))
            pos.push((posicion + 2) + 12, (posicion + 4) + 12, (posicion + 5) + 12, (posicion + 7) + 12, (posicion + 9) + 12, (posicion + 11) + 12, (posicion + 12) + 12)
            const listNotas = notasFinales.split(' ', 7)
            const size2 = listNotas.length
            for(let i = 0; i < listNotas.length; i++){
                const nota1 = pos[(i+2)] - pos[i]
                const nota2 = pos[(i+4)] - pos[(i+2)]
                //console.log(nota1, nota2)
                //console.log(`pos 1 ${pos[i]} pos2 ${pos[(i+2)]} pos3 ${pos[(i+4)]}`)
                dict.map((item) => {
                    if(nota1  === item.key){
                        calidadAcor.push(item.value)
                    }
                })
                dict.map((item) => {
                    if(nota2  === item.key){
                        calidadAcor.push(item.value)
                    }
                })
                if(calidadAcor[i * 2] === "Tercera mayor" && calidadAcor[(i * 2) + 1] === "Tercera menor"){
                    const acordeActual = `Acorde de: ${listNotas[i]} ${listNotas[(i + 2) % size2]} ${calidadAcor[i * 2]} ${listNotas[(i + 4) % size2]} ${calidadAcor[(i * 2) + 1]}` + " " + "Acorde Mayor" + " "
                    Acordes.push(acordeActual)
                }else if(calidadAcor[i * 2] === "Tercera menor" && calidadAcor[(i * 2) + 1] === "Tercera mayor"){
                    const acordeActual = `Acorde de: ${listNotas[i]} ${listNotas[(i + 2) % size2]} ${calidadAcor[i * 2]} ${listNotas[(i + 4) % size2]} ${calidadAcor[(i * 2) + 1]}` + " " + "Acorde menor" + " "
                    Acordes.push(acordeActual)
                }else if(calidadAcor[i * 2] === "Tercera menor" && calidadAcor[(i * 2) + 1] === "Tercera menor"){
                    const acordeActual = `Acorde de: ${listNotas[i]} ${listNotas[(i + 2) % size2]} ${calidadAcor[i * 2]} ${listNotas[(i + 4) % size2]} ${calidadAcor[(i * 2) + 1]}` + " " + "Acorde disminuido" + " "
                    Acordes.push(acordeActual)
                }else if(calidadAcor[i * 2] === "Tercera mayor" && calidadAcor[(i * 2) + 1] === "Tercera mayor"){
                    const acordeActual = `Acorde de: ${listNotas[i]} ${listNotas[(i + 2) % size2]} ${calidadAcor[i * 2]} ${listNotas[(i + 4) % size2]} ${calidadAcor[(i * 2) + 1]}` + " " + "Acorde aumentado" + " "
                    //console.log(`pos1 ${i * 2} pos2 ${(i * 2) + 1}`)
                    Acordes.push(acordeActual)
                }
            }
            setEscala(notasFinales)
            setAcordes(Acordes)
            console.log(Acordes)
            //console.log(pos)
            //console.log(notasFinales)
            //console.log(calidadAcor)
            
        } else if (id === 'Escalasb'){
            const size = AcordesBemol.length
            const posicion = AcordesBemol.indexOf(notaActual)
            const notasFinales = AcordesBemol[posicion] + ' ' + AcordesBemol[(posicion + 2)% size] + ' ' + AcordesBemol[(posicion + 4)% size] + ' ' + AcordesBemol[(posicion + 5)% size] + ' ' + AcordesBemol[(posicion + 7)% size] + ' ' + AcordesBemol[(posicion + 9)% size] + ' ' + AcordesBemol[(posicion + 11)% size] + ' ' + AcordesBemol[(posicion + 12)% size]  
            pos.push(posicion, (posicion + 2), (posicion + 4), (posicion + 5), (posicion + 7), (posicion + 9), (posicion + 11), (posicion + 12))
            pos.push((posicion + 2) + 12, (posicion + 4) + 12, (posicion + 5) + 12, (posicion + 7) + 12, (posicion + 9) + 12, (posicion + 11) + 12, (posicion + 12) + 12)
            const listNotas = notasFinales.split(' ', 7)
            const size2 = listNotas.length
            for(let i = 0; i < listNotas.length; i++){
                const nota1 = pos[(i+2)] - pos[i]
                const nota2 = pos[(i+4)] - pos[(i+2)]
                //console.log(nota1, nota2)
                //console.log(`pos 1 ${pos[i]} pos2 ${pos[(i+2)]} pos3 ${pos[(i+4)]}`)
                dict.map((item) => {
                    if(nota1  === item.key){
                        calidadAcor.push(item.value)
                    }
                })
                dict.map((item) => {
                    if(nota2  === item.key){
                        calidadAcor.push(item.value)
                    }
                })
                if(calidadAcor[i * 2] === "Tercera mayor" && calidadAcor[(i * 2) + 1] === "Tercera menor"){
                    const acordeActual = `Acorde de: ${listNotas[i]} ${listNotas[(i + 2) % size2]} ${calidadAcor[i * 2]} ${listNotas[(i + 4) % size2]} ${calidadAcor[(i * 2) + 1]}` + " " + "Acorde Mayor" + " "
                    Acordes.push(acordeActual)
                }else if(calidadAcor[i * 2] === "Tercera menor" && calidadAcor[(i * 2) + 1] === "Tercera mayor"){
                    const acordeActual = `Acorde de: ${listNotas[i]} ${listNotas[(i + 2) % size2]} ${calidadAcor[i * 2]} ${listNotas[(i + 4) % size2]} ${calidadAcor[(i * 2) + 1]}` + " " + "Acorde menor" + " "
                    Acordes.push(acordeActual)
                }else if(calidadAcor[i * 2] === "Tercera menor" && calidadAcor[(i * 2) + 1] === "Tercera menor"){
                    const acordeActual = `Acorde de: ${listNotas[i]} ${listNotas[(i + 2) % size2]} ${calidadAcor[i * 2]} ${listNotas[(i + 4) % size2]} ${calidadAcor[(i * 2) + 1]}` + " " + "Acorde disminuido" + " "
                    Acordes.push(acordeActual)
                }else if(calidadAcor[i * 2] === "Tercera mayor" && calidadAcor[(i * 2) + 1] === "Tercera mayor"){
                    const acordeActual = `Acorde de: ${listNotas[i]} ${listNotas[(i + 2) % size2]} ${calidadAcor[i * 2]} ${listNotas[(i + 4) % size2]} ${calidadAcor[(i * 2) + 1]}` + " " + "Acorde aumentado" + " "
                    //console.log(`pos1 ${i * 2} pos2 ${(i * 2) + 1}`)
                    Acordes.push(acordeActual)
                }
            }
            setEscala(notasFinales)
            setAcordes(Acordes)
            console.log(Acordes)
            //console.log(pos)
            //console.log(notasFinales)
            //console.log(calidadAcor)
        }
    }

    return(
        <div>
            <h1>Escala mayor y acordes</h1>
            <input type="text" onChange={event => setNota(capitalized(event.target.value))}/>
            <button data-id="Escalas#" type="button" onClick={handleClick}>Calcular #</button>
            <button data-id="Escalasb" type="button" onClick={handleClick}>Calcular b</button>
            <div><span>{Escala}</span></div>
            <div><span style={columnDisp}>{acordes}</span></div>
        </div>
    )
}

export default Escalas