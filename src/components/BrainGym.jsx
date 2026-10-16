import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { brainGymData } from '../data/defaultNews';
import { RefreshCw, CheckCircle2, RotateCcw, HelpCircle, Trophy } from 'lucide-react';

export function BrainGym() {
  /* ================= 1. SUDOKU ================= */
  const initialSudoku = brainGymData.sudoku.puzzle;
  const sudokuSolution = brainGymData.sudoku.solution;

  const [sudokuGrid, setSudokuGrid] = useState(() =>
    initialSudoku.map((row) => [...row])
  );
  const [selectedCell, setSelectedCell] = useState([0, 0]);
  const [sudokuStatus, setSudokuStatus] = useState(null); // 'valid' | 'invalid' | null

  const handleCellClick = (r, c) => {
    setSelectedCell([r, c]);
  };

  const handleSudokuInput = (num) => {
    const [r, c] = selectedCell;
    if (initialSudoku[r][c] !== 0) return; // cannot edit fixed cells

    const newGrid = sudokuGrid.map((row) => [...row]);
    newGrid[r][c] = num;
    setSudokuGrid(newGrid);
    setSudokuStatus(null);
  };

  const handleCheckSudoku = () => {
    let allCorrect = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (sudokuGrid[r][c] !== sudokuSolution[r][c]) {
          allCorrect = false;
          break;
        }
      }
    }
    if (allCorrect) {
      setSudokuStatus('valid');
      confetti({ particleCount: 80, spread: 60 });
    } else {
      setSudokuStatus('invalid');
    }
  };

  const handleResetSudoku = () => {
    setSudokuGrid(initialSudoku.map((row) => [...row]));
    setSudokuStatus(null);
  };

  const handleSudokuHint = () => {
    const uncompleted = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (sudokuGrid[r][c] !== sudokuSolution[r][c] && initialSudoku[r][c] === 0) {
          uncompleted.push([r, c]);
        }
      }
    }
    if (uncompleted.length > 0) {
      const [r, c] = uncompleted[Math.floor(Math.random() * uncompleted.length)];
      const newGrid = sudokuGrid.map((row) => [...row]);
      newGrid[r][c] = sudokuSolution[r][c];
      setSudokuGrid(newGrid);
      setSelectedCell([r, c]);
      setSudokuStatus(null);
    }
  };

  /* ================= 2. INTERACTIVE MAZE ================= */
  const canvasRef = useRef(null);
  const [mazePlayer, setMazePlayer] = useState({ x: 1, y: 1 });
  const [mazeWon, setMazeWon] = useState(false);
  const [mazeSeed, setMazeSeed] = useState(1);

  // 15x15 simple grid maze
  const mazeSize = 15;
  const [mazeGrid, setMazeGrid] = useState(() => generateMaze(mazeSize, mazeSize));

  function generateMaze(w, h) {
    const grid = Array(h).fill(null).map(() => Array(w).fill(1));
    const stack = [];
    const startX = 1, startY = 1;
    grid[startY][startX] = 0;
    stack.push([startX, startY]);

    while (stack.length > 0) {
      const [cx, cy] = stack[stack.length - 1];
      const neighbors = [];

      const dirs = [
        [0, -2], [0, 2], [-2, 0], [2, 0]
      ];

      for (const [dx, dy] of dirs) {
        const nx = cx + dx;
        const ny = cy + dy;
        if (nx > 0 && nx < w - 1 && ny > 0 && ny < h - 1 && grid[ny][nx] === 1) {
          neighbors.push([nx, ny, cx + dx / 2, cy + dy / 2]);
        }
      }

      if (neighbors.length > 0) {
        const [nx, ny, mx, my] = neighbors[Math.floor(Math.random() * neighbors.length)];
        grid[my][mx] = 0;
        grid[ny][nx] = 0;
        stack.push([nx, ny]);
      } else {
        stack.pop();
      }
    }
    grid[h - 2][w - 2] = 0; // exit
    return grid;
  }

  const handleNewMaze = () => {
    const fresh = generateMaze(mazeSize, mazeSize);
    setMazeGrid(fresh);
    setMazePlayer({ x: 1, y: 1 });
    setMazeWon(false);
    setMazeSeed((s) => s + 1);
  };

  // Move maze player
  const moveMaze = (dx, dy) => {
    if (mazeWon) return;
    const nx = mazePlayer.x + dx;
    const ny = mazePlayer.y + dy;

    if (nx >= 0 && nx < mazeSize && ny >= 0 && ny < mazeSize) {
      if (mazeGrid[ny][nx] === 0) {
        setMazePlayer({ x: nx, y: ny });
        if (nx === mazeSize - 2 && ny === mazeSize - 2) {
          setMazeWon(true);
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
      }
    }
  };

  // Draw maze on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cellSize = canvas.width / mazeSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < mazeSize; r++) {
      for (let c = 0; c < mazeSize; c++) {
        if (mazeGrid[r][c] === 1) {
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        } else {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
      }
    }

    // Exit spot
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(
      (mazeSize - 2) * cellSize + 2,
      (mazeSize - 2) * cellSize + 2,
      cellSize - 4,
      cellSize - 4
    );

    // Player
    ctx.fillStyle = '#059669';
    ctx.beginPath();
    ctx.arc(
      mazePlayer.x * cellSize + cellSize / 2,
      mazePlayer.y * cellSize + cellSize / 2,
      cellSize / 2.5,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [mazeGrid, mazePlayer, mazeSeed]);

  /* ================= 3. FINANCE WORDLE ================= */
  const wordsList = brainGymData.wordleWords;
  // Start with a completely random financial word on load
  const [currentWordIdx, setCurrentWordIdx] = useState(() =>
    Math.floor(Math.random() * brainGymData.wordleWords.length)
  );
  const targetWord = wordsList[currentWordIdx]?.word || 'ASSET';
  const targetClue = wordsList[currentWordIdx]?.clue || 'Financial Asset';

  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [wordleOver, setWordleOver] = useState(false);
  const [wordleWon, setWordleWon] = useState(false);

  // Evaluates guess against target with authentic Wordle rules (handles repeat letters)
  const getRowStatuses = (guess, target) => {
    if (!guess || guess.length !== 5) return Array(5).fill('');
    const statuses = Array(5).fill('absent');
    const targetLetters = target.split('');
    const guessLetters = guess.split('');

    // First pass: mark correct positions (green)
    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        statuses[i] = 'correct';
        targetLetters[i] = null;
      }
    }

    // Second pass: mark present letters (yellow)
    for (let i = 0; i < 5; i++) {
      if (statuses[i] !== 'correct') {
        const foundIdx = targetLetters.indexOf(guessLetters[i]);
        if (foundIdx !== -1) {
          statuses[i] = 'present';
          targetLetters[foundIdx] = null;
        }
      }
    }
    return statuses;
  };

  const handleWordleChar = (char) => {
    if (wordleOver) return;
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + char.toUpperCase());
    }
  };

  const handleWordleBackspace = () => {
    if (wordleOver) return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleWordleSubmit = () => {
    if (wordleOver) return;
    if (currentGuess.length !== 5) return;

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    if (currentGuess === targetWord) {
      setWordleWon(true);
      setWordleOver(true);
      confetti({ particleCount: 90, spread: 80 });
    } else if (newGuesses.length >= 6) {
      setWordleOver(true);
    }
    setCurrentGuess('');
  };

  const handleNewWordle = () => {
    // Pick a non-repeating random word
    let nextIdx = Math.floor(Math.random() * wordsList.length);
    if (wordsList.length > 1 && nextIdx === currentWordIdx) {
      nextIdx = (nextIdx + 1) % wordsList.length;
    }
    setCurrentWordIdx(nextIdx);
    setGuesses([]);
    setCurrentGuess('');
    setWordleOver(false);
    setWordleWon(false);
  };

  /* ================= 4. FINANCE TRIVIA ================= */
  const [triviaIdx, setTriviaIdx] = useState(0);
  const [selectedTriviaOption, setSelectedTriviaOption] = useState(null);
  const [triviaScore, setTriviaScore] = useState(0);

  const currentTrivia = brainGymData.triviaQuestions[triviaIdx];

  const handleSelectTrivia = (idx) => {
    if (selectedTriviaOption !== null) return;
    setSelectedTriviaOption(idx);
    if (idx === currentTrivia.answerIndex) {
      setTriviaScore((s) => s + 1);
      confetti({ particleCount: 40, spread: 50 });
    }
  };

  const handleNextTrivia = () => {
    setSelectedTriviaOption(null);
    setTriviaIdx((prev) => (prev + 1) % brainGymData.triviaQuestions.length);
  };

  /* ================= 5. HIGHER OR LOWER ================= */
  const [hlIdx, setHlIdx] = useState(0);
  const [hlStreak, setHlStreak] = useState(0);
  const [hlResult, setHlResult] = useState(null);

  const currentHL = brainGymData.higherOrLower[hlIdx % brainGymData.higherOrLower.length];

  const handleHLGuess = (guessAIsHigher) => {
    const actuallyHigher = currentHL.valA > currentHL.valB;
    const isCorrect = guessAIsHigher === actuallyHigher;

    if (isCorrect) {
      setHlStreak((s) => s + 1);
      setHlResult('correct');
      confetti({ particleCount: 30, spread: 40 });
    } else {
      setHlStreak(0);
      setHlResult('wrong');
    }

    setTimeout(() => {
      setHlResult(null);
      setHlIdx((i) => i + 1);
    }, 1200);
  };

  return (
    <section className="brain-gym-section" id="brain-gym">
      <div className="brain-gym-header">
        <h2 className="brain-gym-title">BRAIN GYM</h2>
        <p className="brain-gym-subtitle">touch grass later</p>
      </div>

      <div className="games-grid">
        {/* GAME 1: SUDOKU */}
        <div className="game-card">
          <div className="game-title">SUDOKU</div>
          <p className="game-desc">Today's grid. Lock in and fill it out.</p>

          <div className="sudoku-board">
            {sudokuGrid.map((row, r) =>
              row.map((val, c) => {
                const isFixed = initialSudoku[r][c] !== 0;
                const isSelected = selectedCell[0] === r && selectedCell[1] === c;
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`sudoku-cell ${isFixed ? 'fixed' : ''} ${
                      isSelected ? 'selected' : ''
                    }`}
                    onClick={() => handleCellClick(r, c)}
                  >
                    {val !== 0 ? val : ''}
                  </div>
                );
              })
            )}
          </div>

          <div className="sudoku-keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button
                key={n}
                className="sudoku-key"
                onClick={() => handleSudokuInput(n)}
              >
                {n}
              </button>
            ))}
            <button
              className="sudoku-key"
              style={{ width: '40px' }}
              onClick={() => handleSudokuInput(0)}
            >
              DEL
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button className="btn-newspaper btn-primary-dark" onClick={handleCheckSudoku}>
              CHECK
            </button>
            <button className="btn-newspaper" onClick={handleSudokuHint} title="Reveal a correct number in the grid">
              HINT
            </button>
            <button className="btn-newspaper" onClick={handleResetSudoku}>
              RESET
            </button>
          </div>

          {sudokuStatus === 'valid' && (
            <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', textAlign: 'center', marginTop: '8px', fontSize: '0.85rem' }}>
              ✓ Grid Verified Correct!
            </div>
          )}
          {sudokuStatus === 'invalid' && (
            <div style={{ color: 'var(--accent-red)', fontWeight: 'bold', textAlign: 'center', marginTop: '8px', fontSize: '0.85rem' }}>
              ✗ Errors detected in grid. Keep trying.
            </div>
          )}
        </div>

        {/* GAME 2: MAZE */}
        <div className="game-card">
          <div className="game-title">MAZE</div>
          <p className="game-desc">Click in, lock in, then arrow keys it out.</p>

          <div className="maze-canvas-wrap">
            <canvas
              ref={canvasRef}
              width={240}
              height={240}
              className="maze-canvas"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp' || e.key === 'w') moveMaze(0, -1);
                if (e.key === 'ArrowDown' || e.key === 's') moveMaze(0, 1);
                if (e.key === 'ArrowLeft' || e.key === 'a') moveMaze(-1, 0);
                if (e.key === 'ArrowRight' || e.key === 'd') moveMaze(1, 0);
              }}
            />

            {/* Mobile / Screen directional buttons */}
            <div className="maze-controls-row">
              <button className="btn-newspaper" onClick={() => moveMaze(0, -1)}>↑</button>
              <button className="btn-newspaper" onClick={() => moveMaze(-1, 0)}>←</button>
              <button className="btn-newspaper" onClick={() => moveMaze(0, 1)}>↓</button>
              <button className="btn-newspaper" onClick={() => moveMaze(1, 0)}>→</button>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            {mazeWon ? (
              <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', marginBottom: '8px' }}>
                🎉 You Escaped the Matrix!
              </div>
            ) : (
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '8px' }}>
                Move green dot to gold exit portal.
              </div>
            )}
            <button className="btn-newspaper" onClick={handleNewMaze}>
              NEW MAZE
            </button>
          </div>
        </div>

        {/* GAME 3: FINANCE WORDLE */}
        <div className="game-card">
          <div className="game-title">FINANCE WORDLE</div>
          <p className="game-desc">5-letter money word. 6 tries. We gave you a clue, use it.</p>

          <div className="wordle-clue-box">
            🔍 <strong>Clue:</strong> {targetClue}
          </div>

          <div className="wordle-grid">
            {Array(6).fill(null).map((_, rowIdx) => {
              const isPastGuess = rowIdx < guesses.length;
              const isCurrentRow = rowIdx === guesses.length;
              const rowGuess = guesses[rowIdx] || (isCurrentRow ? currentGuess : '');
              const statuses = isPastGuess ? getRowStatuses(rowGuess, targetWord) : [];

              return (
                <div key={rowIdx} className="wordle-row">
                  {Array(5).fill(null).map((__, colIdx) => {
                    const char = rowGuess[colIdx] || '';
                    let status = '';

                    if (isPastGuess) {
                      status = statuses[colIdx];
                    } else if (char) {
                      status = 'filled';
                    }

                    return (
                      <div key={colIdx} className={`wordle-tile ${status}`}>
                        {char}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Quick On-Screen Keyboard */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', marginBottom: '10px', maxWidth: '280px', margin: '0 auto 10px auto' }}>
            {'QWERTYUIOPASDFGHJKLZXCVBNM'.split('').map((k) => (
              <button
                key={k}
                className="sudoku-key"
                style={{ width: '24px', height: '24px', fontSize: '0.7rem' }}
                onClick={() => handleWordleChar(k)}
              >
                {k}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button className="btn-newspaper" onClick={handleWordleBackspace}>
              DEL
            </button>
            <button className="btn-newspaper btn-primary-dark" onClick={handleWordleSubmit}>
              ENTER
            </button>
            <button className="btn-newspaper" onClick={handleNewWordle}>
              NEW WORD
            </button>
          </div>

          {wordleWon && (
            <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', textAlign: 'center', marginTop: '8px' }}>
              🎯 Correct! Word was {targetWord}
            </div>
          )}
          {wordleOver && !wordleWon && (
            <div style={{ color: 'var(--accent-red)', fontWeight: 'bold', textAlign: 'center', marginTop: '8px' }}>
              Game Over. The word was: {targetWord}
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM GAMES: Trivia & Higher/Lower */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '28px' }}>
        {/* Trivia */}
        <div className="game-card">
          <div className="game-title">FINANCE TRIVIA</div>
          <p className="game-desc">Multiple choice. Flex your market literacy.</p>

          <p style={{ fontWeight: '600', fontSize: '0.88rem', marginBottom: '12px' }}>
            {currentTrivia.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            {currentTrivia.options.map((opt, i) => {
              let optStyle = {};
              if (selectedTriviaOption !== null) {
                if (i === currentTrivia.answerIndex) {
                  optStyle = { background: '#10b981', color: '#fff', borderColor: '#059669' };
                } else if (i === selectedTriviaOption) {
                  optStyle = { background: '#ef4444', color: '#fff', borderColor: '#b91c1c' };
                }
              }

              return (
                <button
                  key={i}
                  className="btn-newspaper"
                  style={{ textAlign: 'left', justifyContent: 'flex-start', ...optStyle }}
                  onClick={() => handleSelectTrivia(i)}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', marginRight: '6px' }}>{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {selectedTriviaOption !== null && (
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)', marginBottom: '8px' }}>
              💡 {currentTrivia.explanation}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>Score: {triviaScore}</span>
            <button className="btn-newspaper" onClick={handleNextTrivia}>Next Question</button>
          </div>
        </div>

        {/* Higher or Lower */}
        <div className="game-card">
          <div className="game-title">HIGHER OR LOWER</div>
          <p className="game-desc">Which asset or company flexes higher valuation?</p>

          <div style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '4px', textAlign: 'center', marginBottom: '14px' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: '800', marginBottom: '4px' }}>
              {currentHL.entityA}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '10px' }}>
              vs
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: '800' }}>
              {currentHL.entityB}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '12px' }}>
            <button
              className="btn-newspaper btn-primary-dark"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => handleHLGuess(true)}
            >
              {currentHL.entityA.split(' ')[0]} is HIGHER
            </button>
            <button
              className="btn-newspaper"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => handleHLGuess(false)}
            >
              {currentHL.entityB.split(' ')[0]} is HIGHER
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
            <span>Streak: <strong>{hlStreak} 🔥</strong></span>
            {hlResult && (
              <span style={{ color: hlResult === 'correct' ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 'bold' }}>
                {hlResult === 'correct' ? 'CORRECT!' : 'MISSED!'}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
