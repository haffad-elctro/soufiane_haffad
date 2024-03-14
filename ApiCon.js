import React, { useState, useEffect } from 'react';

function Component() {
    const [auteur, setAuteurs] = useState([]);
    const [livre , setLivres] = useState([]);
    const [editeur , setEditeur] = useState([]);
    const [user , setUser] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/auteur/all');
                const responses = await fetch('http://localhost:3000/livre/all');
                const responsee = await fetch('http://localhost:3000/editeur/all');
                const responsees = await fetch('http://localhost:3000/user/all');
                const data = await response.json();
                const date = await responses.json();
                const dats = await responsee.json();
                const datss = await responsees.json();
                setAuteurs(data);
                setLivres(date);
                setEditeur(dats);
                setUser(datss);
            } catch (error) {
                console.error('Error fetching auteur:', error);
            }
        };
        
        fetchData();
    }, []);

    return (
        <div>
            <h1>auteurs List</h1>
            <ul>
                {auteur.map(auteurs => (
                    <li key={auteur.id}>
                        {auteurs.nom} - {auteurs.nationalite}
                    </li>
                ))}
            </ul>
            <h1>les livres list</h1>
            <ul>
                {livre.map(livres => (
                    <li key={livres.id}>
                        {livres.titre} - {livres.auteur}
                    </li>
                ))}
            </ul>
            <h1>les editeurs list</h1>
            <ul>
                {editeur.map(editeurs => (
                    <li key={editeurs.id}>
                        {editeurs.adresse}
                    </li>
                ))}
            </ul>
            <h1>les editeurs list</h1>
            <ul>
                {user.map(users => (
                    <li key={users.id}>
                        {users.email} -{users.nom}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Component;
