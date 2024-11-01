import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NHLScores() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard');
        setGames(response.data.events);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const fetchGameDetails = async (gameId) => {
    try {
      const response = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/summary?event=${gameId}`);
      setSelectedGame(response.data);
    } catch (err) {
      console.error('Error fetching game details');
    }
  };

  const handleGameClick = (gameId) => {
    fetchGameDetails(gameId);
  };

  const toggleShowAll = () => {
    if (selectedGame) {
      setSelectedGame(null); // Reset selected game to show the list again
    } else {
      setShowAll(!showAll); // Toggle showAll if no game is selected
    }
  };

  if (loading) return <p className='game-item'>Loading...</p>;
  if (error) return <p className='game-item'>{error}</p>;

  return (
    <div className="nhl-scores">
      <h3 className='league-name' onClick={toggleShowAll}>
        NHL
        {selectedGame ? (
          <button className='show-less-btn'>Back to Games</button>
        ) : (
          showAll && <button className='show-less-btn'>Show Less</button>
        )}
      </h3>

      {selectedGame ? (
        <div className="game-details games-list">
          <h3>{selectedGame.header.competitions[0].competitors[1].team.displayName} at {""}
              {selectedGame.header.competitions[0].competitors[0].team.displayName}
          </h3>
          <p>Status: {selectedGame.header.competitions[0].status.type.shortDetail}</p>
        </div>
      ) : (
        <ul className="games-list">
          {(showAll ? games : games.slice(0, 3)).map((game) => (
            <li
              className='each-game'
              key={game.id}
              onClick={() => handleGameClick(game.id)}
            >
              {game.name} - {game.status.type.shortDetail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NHLScores;
