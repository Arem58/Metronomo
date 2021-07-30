import React, {useState} from 'react'

const Escalas = () =>{
    const [Escala, setEscala] = useState('')
    const [nota, setNota] = useState('')
    const [acordes, setAcordes] = useState('')
    // Do, Do#, Re, Re#, Mi, Fa, Fa#, Sol, Sol#, La, La# y Si
    const AcordesSostenido = ["Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"]
    const AcordesBemol = ["Do", "Reb", "Re", "Mib", "Mi", "Fa", "Solb", "Sol", "La", "Sib", "Si"]
    const Acordes = []

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
            const listNotas = notasFinales.split(' ', 7)
            const size2 = listNotas.length
            for(let i = 0; i < listNotas.length; i++){
                const acordeActual = 'Acorde de: ' + listNotas[i] + '\n' + listNotas[(i + 2) % size2] + '\n' + listNotas[(i + 4) % size2] + ' '
                Acordes.push(acordeActual)
            }
            setEscala(notasFinales)
            setAcordes(Acordes)
            
        } else if (id === 'Escalasb'){
            const size = AcordesBemol.length
            const posicion = AcordesBemol.indexOf(notaActual)
            const notasFinales = AcordesBemol[posicion] + ' ' + AcordesBemol[(posicion + 2)% size] + ' ' + AcordesBemol[(posicion + 4)% size] + ' ' + AcordesBemol[(posicion + 5)% size] + ' ' + AcordesBemol[(posicion + 7)% size] + ' ' + AcordesBemol[(posicion + 9)% size] + ' ' + AcordesBemol[(posicion + 11)% size] + ' ' + AcordesBemol[(posicion + 12)% size]  
            const listNotas = notasFinales.split(' ', 7)
            const size2 = listNotas.length
            for(let i = 0; i < listNotas.length; i++){
                const acordeActual = 'Acorde de: ' + listNotas[i] + '\n' + listNotas[(i + 2) % size2] + '\n' + listNotas[(i + 4) % size2] + ' '
                Acordes.push(acordeActual)
            }
            setEscala(notasFinales)
            setAcordes(Acordes)
        }
    }

    return(
        <div>
            <h1>Escala mayor y acordes</h1>
            <input type="text" onChange={event => setNota(capitalized(event.target.value))}/>
            <button data-id="Escalas#" type="button" onClick={handleClick}>Calcular #</button>
            <button data-id="Escalasb" type="button" onClick={handleClick}>Calcular b</button>
            <div><span>{Escala}</span></div>
            <div><span>{acordes}</span></div>
        </div>
    )
}

export default Escalas