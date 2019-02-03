export default [
  { input: 'play me some music', output: { playMusic: 1 } },
  { input: 'please play music katou', output: { playMusic: 1 } },
  { input: 'play something katou', output: { playMusic: 1 } },
  { input: 'katou can you play some music', output: { playMusic: 1 } },
  { input: 'music please', output: { playMusic: 1 } },
  { input: 'katou please turn on the music', output: { playMusic: 1 } },
  { input: 'katou turn off the computer', output: { turnOffComputer: 1 } },
  {
    input: 'katou please shutdown the computer',
    output: { turnOffComputer: 1 },
  },
  {
    input: 'can you please turn off the computer',
    output: { turnOffComputer: 1 },
  },
  { input: 'please turn off the pc', output: { turnOffComputer: 1 } },
  { input: 'turn off the computer please', output: { turnOffComputer: 1 } },
];
