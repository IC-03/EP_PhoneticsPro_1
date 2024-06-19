import React, { useEffect, useState } from "react";

const Attempts = () => { 

    const [listaPorId, setListaPorId] = useState([]);
    let id = sessionStorage.getItem('id_user');
    id = parseInt(id);

    useEffect(() => {
        const fetchAndCombineAttempts = async () => {
            try {
                const response = await fetch("http://localhost:8094/api/Attempt/list");
                const data = await response.json();

                const filteredData = data.filter(intento => id === intento.id_user.id_user);

                let combinedList = [...filteredData];
                for (let i = 0; i < combinedList.length; i++) {
                    for (let j = i + 1; j < combinedList.length; j++) {
                        if (combinedList[i].date_attempt === combinedList[j].date_attempt) {
                            combinedList[i].total_attempt += combinedList[j].total_attempt;
                            combinedList[i].correct_attempt += combinedList[j].correct_attempt;
                            combinedList.splice(j, 1);
                            j--;
                        }
                    }
                }

                setListaPorId(combinedList);
            } catch (error) {
                console.error("Error al cargar las palabras", error);
                alert("Ha ocurrido un error, intente más tarde");
            }
        };

        fetchAndCombineAttempts();
    }, [id]);

    function formatoFecha(fecha) {
        const date = new Date(fecha);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        if (month.length === 1) {
            month = '0' + month;
        }
        if (day.length === 1) {
            day = '0' + day;
        }
        return `${year}-${month}-${day}`;
    }

    return (
        <div>
            {
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {listaPorId.map((intento, index) => (
                    <li key={index}> <b>{formatoFecha(intento.date_attempt)}:</b> <br/>
                    Intentos totales: {intento.total_attempt}, <br/>
                    Intentos correctos: {intento.correct_attempt}. </li>
                ))}
            </ul>
            }
        </div>
    );
};

export default Attempts;
