<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100 p-4 sm:p-6">
    <!-- Header Section -->
    <header class="max-w-7xl mx-auto text-center mb-8">
      <h1 class="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2 tracking-tight">
        Ear Training App
      </h1>
      <p class="text-indigo-600 text-sm sm:text-base font-medium">Train your ear to recognise musical intervals</p>
    </header>

    <div class="max-w-7xl mx-auto">
      <!-- Main Card -->
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-indigo-100">
        <!-- Setup Section -->
        <div class="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 sm:p-8 text-white relative overflow-hidden">
          <!-- Decorative elements -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          
          <h2 class="text-2xl font-bold mb-6 flex items-center relative z-10">
            <i class="mdi mdi-tune-vertical mr-3 text-2xl"></i>
            Setup
          </h2>
          
          <!-- Form controls in 2 rows for desktop, 1 per row for mobile -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            <div class="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm shadow-inner">
              <label for="clef" class="block text-sm font-medium text-white mb-2">Clef</label>
              <select v-model="clef" id="clef" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-0 focus:outline-none focus:ring-2 focus:ring-purple-300 sm:text-sm rounded-md shadow-sm text-gray-700 font-medium">
                <option v-for="(range, key) in CLEF_RANGES" :key="key" :value="key">{{ range.name }}</option>
              </select>
            </div>

            <div class="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm shadow-inner">
              <label for="key" class="block text-sm font-medium text-white mb-2">Key</label>
              <select v-model="key" id="key" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-0 focus:outline-none focus:ring-2 focus:ring-purple-300 sm:text-sm rounded-md shadow-sm text-gray-700 font-medium">
                <option v-for="keyData in KEYS" :key="keyData.name" :value="keyData.name">{{ keyData.name }}</option>
              </select>
            </div>

            <div class="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm shadow-inner">
              <label for="majorMinor" class="block text-sm font-medium text-white mb-2">Tonality</label>
              <select v-model="majorMinor" id="majorMinor" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-0 focus:outline-none focus:ring-2 focus:ring-purple-300 sm:text-sm rounded-md shadow-sm text-gray-700 font-medium">
                <option value="major">Major</option>
                <option value="minor">Minor</option>
                <option value="chromatic">Chromatic</option>
              </select>
            </div>

            <div class="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm shadow-inner">
              <label for="speed" class="block text-sm font-medium text-white mb-2">
                Speed ({{ speed.toFixed(1) }}s)
              </label>
              <input type="range" v-model.number="speed" id="speed" min="0.3" max="2" step="0.1" class="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer mt-3">
            </div>
          </div>
          
          <!-- Advanced Settings Toggle -->
          <div class="mt-8 relative z-10">
            <button 
              @click="toggleAdvanced" 
              class="flex items-center text-sm text-white bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg focus:outline-none transition-colors"
            >
              <i :class="['mdi mr-2 text-lg', showAdvanced ? 'mdi-chevron-down' : 'mdi-chevron-right']"></i>
              Advanced Settings
            </button>
            
            <!-- Advanced Settings Panel -->
            <div v-if="showAdvanced" class="mt-4 p-6 bg-indigo-700 bg-opacity-50 rounded-xl backdrop-blur-sm">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div class="bg-white bg-opacity-10 p-4 rounded-xl flex items-center">
                  <input v-model="startFromRoot" id="startFromRoot" type="checkbox" class="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded">
                  <label for="startFromRoot" class="ml-3 block text-sm text-white font-medium">Start from Root note</label>
                </div>

                <div class="bg-white bg-opacity-10 p-4 rounded-xl flex items-center">
                  <input v-model="notesAboveRoot" id="notesAboveRoot" type="checkbox" class="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded">
                  <label for="notesAboveRoot" class="ml-3 block text-sm text-white font-medium">Notes above root note</label>
                </div>

                <div class="bg-white bg-opacity-10 p-4 rounded-xl flex items-center">
                  <input v-model="oneOctaveLimit" id="oneOctaveLimit" type="checkbox" class="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded">
                  <label for="oneOctaveLimit" class="ml-3 block text-sm text-white font-medium">One octave limit</label>
                </div>

                <div class="bg-white bg-opacity-10 p-4 rounded-xl">
                  <label for="numNotes" class="block text-sm font-medium text-white mb-2">Notes per Phrase</label>
                  <input type="number" v-model.number="numNotes" id="numNotes" min="2" max="7" class="mt-1 focus:ring-purple-300 focus:border-purple-300 block w-full shadow-sm sm:text-sm border-0 rounded-md py-2 px-3 text-gray-700 font-medium">
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Action Section -->
        <div class="p-8 bg-gradient-to-b from-white to-indigo-50">
          <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <button
              @click="generateNotes"
              :disabled="playing"
              class="w-full sm:w-40 h-14 inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 relative overflow-hidden"
            >
              <span class="absolute inset-0 flex items-center justify-center text-white opacity-20 text-7xl font-bold">1</span>
              <span class="relative z-10 flex items-center">
                <i class="mdi mdi-refresh mr-2 text-xl"></i>
                New Notes
              </span>
            </button>

            <button
              @click="playNotes"
              :disabled="playing || notes.length === 0"
              class="w-full sm:w-40 h-14 inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 relative overflow-hidden"
            >
              <span class="absolute inset-0 flex items-center justify-center text-white opacity-20 text-7xl font-bold">2</span>
              <span class="relative z-10 flex items-center">
                <i class="mdi mdi-play mr-2 text-xl"></i>
                Play
              </span>
            </button>
            
            <button
              v-if="notes.length > 0 && !showAnswers"
              @click="revealAnswers"
              class="w-full sm:w-40 h-14 inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all transform hover:scale-105 relative overflow-hidden"
            >
              <span class="absolute inset-0 flex items-center justify-center text-white opacity-20 text-7xl font-bold">3</span>
              <span class="relative z-10 flex items-center">
                <i class="mdi mdi-eye mr-2 text-xl"></i>
                Reveal Answer
              </span>
            </button>
          </div>

          <!-- Status Messages -->
          <div v-if="notes.length > 0 && !playing && !showAnswers" class="text-center text-indigo-700 bg-indigo-100 p-4 rounded-xl mb-6 animate-pulse shadow-inner border border-indigo-200">
            <i class="mdi mdi-music-note mr-2 text-xl"></i> Notes ready. Press Play!
          </div>
          
          <div v-if="playing && !isPlayingClickedNote" class="text-center text-indigo-700 bg-indigo-100 p-4 rounded-xl mb-6 animate-pulse shadow-inner border border-indigo-200">
            <i class="mdi mdi-music-note-eighth mr-2 text-xl"></i> Playing...
          </div>
          
          <!-- Answer Display -->
          <div v-if="showAnswers && noteDetails.length > 0" class="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border border-indigo-100 shadow-lg">
            <h3 class="text-xl font-bold text-indigo-900 mb-6 flex items-center">
              <i class="mdi mdi-music-note-plus mr-3 text-2xl text-indigo-600"></i> Note Details
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div 
                v-for="(detail, index) in noteDetails" 
                :key="index" 
                @click="playNoteOnce(detail.midiNote)"
                class="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border-l-4 border-indigo-500 hover:shadow-md transition-shadow transform hover:scale-105 cursor-pointer"
              >
                <div class="font-bold text-gray-800 text-xl">{{ detail.noteName }}</div>
                <div class="text-indigo-600 font-medium">{{ detail.intervalName }}</div>
              </div>
            </div>
          </div>

          <!-- Error Display -->
          <div v-if="generationError" class="mt-6 text-center text-red-600 bg-red-50 p-4 rounded-xl border border-red-200 shadow-inner">
            <i class="mdi mdi-alert-circle mr-2 text-xl"></i> Error: {{ generationError }}
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="mt-8 text-center text-indigo-500 text-sm">
        <p> &copy; {{ new Date().getFullYear() }} Ear Training App, vrtualnz.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import '@mdi/font/css/materialdesignicons.css';

// Constants
const MIDI_NOTE_NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const CLEF_RANGES = {
  bass: { defaultMin: 36, defaultMax: 72, name: 'Bass (C2-C5)' },
  treble: { defaultMin: 57, defaultMax: 93, name: 'Treble (A3-A6)' }
};

// Define standard scale patterns (semitone intervals from the root)
const SCALE_PATTERNS = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
};

const KEYS = {
  C: { name: 'C', rootIndex: 0 },
  Db: { name: 'Db', rootIndex: 1 },
  D: { name: 'D', rootIndex: 2 },
  Eb: { name: 'Eb', rootIndex: 3 },
  E: { name: 'E', rootIndex: 4 },
  F: { name: 'F', rootIndex: 5 },
  Gb: { name: 'Gb', rootIndex: 6 },
  G: { name: 'G', rootIndex: 7 },
  Ab: { name: 'Ab', rootIndex: 8 },
  A: { name: 'A', rootIndex: 9 },
  Bb: { name: 'Bb', rootIndex: 10 },
  B: { name: 'B', rootIndex: 11 }
};

const INTERVAL_RANGE_MAP = {
  '5': { maxSemitones: 7, name: '2nd to 5th' },
  '8': { maxSemitones: 12, name: 'Octave' },
  '15': { maxSemitones: 24, name: '2 Octaves' }
};

// Interval names mapping
const INTERVAL_NAMES = {
  0: 'root',
  1: 'minor 2nd',
  2: 'major 2nd',
  3: 'minor 3rd',
  4: 'major 3rd',
  5: 'perfect 4th',
  6: 'tritone',
  7: 'perfect 5th',
  8: 'minor 6th',
  9: 'major 6th',
  10: 'minor 7th',
  11: 'major 7th',
  12: 'octave'
};

// Reactive State
const clef = ref('bass');
const key = ref('C');
const majorMinor = ref('major');
const speed = ref(1);
const startFromRoot = ref(true);
const numNotes = ref(3);
const notes = ref([]);
const playing = ref(false);
const generationError = ref(null);
const showAnswers = ref(false);
const noteDetails = ref([]);
const showAdvanced = ref(false);
const isPlayingClickedNote = ref(false);
const previousNotes = ref([]); // Add this to store the previous sequence
const notesAboveRoot = ref(true); // New ref for notes above root note setting
const oneOctaveLimit = ref(true); // New ref for one octave limit setting

let audioContext = null;

// Computed Properties
const currentClefRange = computed(() => CLEF_RANGES[clef.value]);
const currentKeyData = computed(() => KEYS[key.value]);
const noteDuration = computed(() => Math.max(0.1, speed.value * 0.8));
const rootMidi = computed(() => getRootMidiInClef(key.value, currentClefRange.value));

// Lifecycle Hooks
onMounted(() => {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    console.error("Web Audio API is not supported in this browser", e);
    generationError.value = "Web Audio API not supported in this browser.";
  }
});

// Helper Functions
function midiToFrequency(midiNote) {
  if (midiNote === null || midiNote === undefined) return 0;
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRootMidiInClef(keyName, clefInfo) {
  const keyRootOffset = MIDI_NOTE_NAMES.indexOf(keyName);
  if (keyRootOffset === -1) return 60;
  
  // Set a consistent octave based on the clef
  let targetOctave;
  if (clef.value === 'bass') {
    targetOctave = 3; // Use octave 3 (middle range) for bass clef
  } else {
    targetOctave = 4; // Use octave 4 for treble clef
  }
  
  // Calculate the MIDI note for the root in the target octave
  let rootMidi = keyRootOffset + 12 * targetOctave;
  
  // Make sure the root note is within a reasonable range
  const minAllowed = clefInfo.defaultMin;
  const maxAllowed = clefInfo.defaultMax - 12; // Ensure at least an octave above root is available
  
  // Adjust octave if needed, but try to stay close to the target octave
  if (rootMidi < minAllowed) {
    rootMidi += 12; // Go up an octave
  } else if (rootMidi > maxAllowed) {
    rootMidi -= 12; // Go down an octave
  }
  
  return rootMidi;
}

function isNoteInScale(midiNote, rootMidi, scaleType) {
  if (midiNote === null || rootMidi === null) return false;
  
  // If using chromatic scale, all notes are valid
  if (scaleType === 'chromatic') return true;
  
  // Calculate the semitone interval from the root
  const intervalFromRoot = ((midiNote - rootMidi) % 12 + 12) % 12;
  
  // Check if this interval is in the scale pattern
  return SCALE_PATTERNS[scaleType].includes(intervalFromRoot);
}

function getNoteName(midiNote) {
  if (midiNote === null || midiNote === undefined) return '';
  const noteName = MIDI_NOTE_NAMES[midiNote % 12];
  const octave = Math.floor(midiNote / 12) - 1;
  return `${noteName}${octave}`;
}

function getIntervalName(midiNote, rootMidiNote) {
  if (midiNote === null || rootMidiNote === null) return '';
  const semitones = ((midiNote - rootMidiNote) % 12 + 12) % 12;
  return INTERVAL_NAMES[semitones] || `${semitones} semitones`;
}

const toggleAdvanced = () => {
  showAdvanced.value = !showAdvanced.value;
};

// Core Logic
const generateNotes = () => {
  showAnswers.value = false;
  generationError.value = null;
  if (!audioContext) {
    generationError.value = "Audio system not initialized.";
    return;
  }

  const { defaultMin: minMidi, defaultMax: maxMidi } = currentClefRange.value;
  const rootMidiNote = rootMidi.value;
  
  // Ensure we have at least an octave above the root note available
  const effectiveMaxMidi = Math.max(maxMidi, rootMidiNote + 12);

  let generated = [];
  let attempts = 0;
  const maxAttemptsPerNote = 150;
  let overallAttempts = 0;
  const maxOverallAttempts = 50;
  
  // Keep generating new sequences until we get one that's different from the previous
  while (overallAttempts < maxOverallAttempts) {
    overallAttempts++;
    generated = []; // Clear the array for a new attempt
    
    let firstNote = null;
    if (startFromRoot.value) {
      firstNote = rootMidiNote;
      if (firstNote < minMidi || firstNote > effectiveMaxMidi) {
        console.warn(`Root note ${MIDI_NOTE_NAMES[rootMidiNote % 12]} (${firstNote}) is outside default clef range [${minMidi}-${effectiveMaxMidi}]. Trying to adjust.`);
        if (firstNote < minMidi && rootMidiNote + 12 <= effectiveMaxMidi) firstNote += 12;
        else if (firstNote > effectiveMaxMidi && rootMidiNote - 12 >= minMidi) firstNote -= 12;
        if (firstNote < minMidi || firstNote > effectiveMaxMidi) {
          generationError.value = `Cannot place root note ${key.value} within the selected clef range [${minMidi}-${effectiveMaxMidi}]. Try different settings.`;
          notes.value = [];
          noteDetails.value = [];
          return;
        }
        console.warn(`Adjusted root note to ${firstNote}`);
      }
    } else {
      attempts = 0;
      while (firstNote === null && attempts < maxAttemptsPerNote * 2) {
        const randomNote = getRandomInt(minMidi, effectiveMaxMidi);
        if (isNoteInScale(randomNote, rootMidiNote, majorMinor.value)) {
          firstNote = randomNote;
        }
        attempts++;
      }
      if (firstNote === null) {
        generationError.value = "Could not find a random starting note in the scale within the selected range. Try adjusting range or key.";
        notes.value = [];
        noteDetails.value = [];
        return;
      }
    }
    generated.push(firstNote);

    let lastNote = firstNote;
    let generationSuccessful = true;
    
    for (let i = 1; i < numNotes.value; i++) {
      let nextNote = null;
      attempts = 0;
      while (nextNote === null && attempts < maxAttemptsPerNote) {
        attempts++;
        let semitoneDiff = getRandomInt(1, 12);
        if (semitoneDiff === 0) semitoneDiff = 1;

        if (Math.random() < 0.5) {
          semitoneDiff *= -1;
        }
        const potentialNote = lastNote + semitoneDiff;

        // Check if the note is above the root note when notesAboveRoot is enabled
        const isAboveRootCheck = !notesAboveRoot.value || potentialNote >= rootMidiNote;
        
        // Check if the note is within one octave of the root when oneOctaveLimit is enabled
        const isWithinOctaveCheck = !oneOctaveLimit.value || (potentialNote <= rootMidiNote + 12);

        if (potentialNote >= minMidi &&
            potentialNote <= effectiveMaxMidi &&
            isNoteInScale(potentialNote, rootMidiNote, majorMinor.value) &&
            isAboveRootCheck &&
            isWithinOctaveCheck)
        {
          nextNote = potentialNote;
        }
      }
      if (nextNote === null) {
        generationError.value = `Could not generate note ${i+1} after ${attempts} attempts. Try different settings.`;
        generationSuccessful = false;
        break;
      }
      generated.push(nextNote);
      lastNote = nextNote;
    }
    
    if (!generationSuccessful) {
      notes.value = [];
      noteDetails.value = [];
      return;
    }
    
    // Check if the generated sequence is different from the previous one
    if (previousNotes.value.length !== generated.length) {
      break; // Different length, so definitely different sequence
    }
    
    let isDifferent = false;
    for (let i = 0; i < generated.length; i++) {
      if (generated[i] !== previousNotes.value[i]) {
        isDifferent = true;
        break;
      }
    }
    
    if (isDifferent || previousNotes.value.length === 0) {
      break; // Found a different sequence or this is the first sequence
    }
    
    // If we've reached the max attempts and still haven't found a different sequence
    if (overallAttempts >= maxOverallAttempts) {
      // Just use what we have as a last resort
      break;
    }
  }
  
  // Store the current sequence as the previous one for next time
  previousNotes.value = [...generated];
  notes.value = generated;
  calculateNoteDetails();
};

const calculateNoteDetails = () => {
  const rootMidiNote = rootMidi.value;
  noteDetails.value = notes.value.map(note => {
    return {
      midiNote: note,
      noteName: getNoteName(note),
      intervalName: getIntervalName(note, rootMidiNote)
    };
  });
};

const revealAnswers = () => {
  showAnswers.value = true;
};

const playNote = (midiNote, startTime, duration) => {
  if (!audioContext || midiNote === null) return;

  const freq = midiToFrequency(midiNote);
  if (freq <= 0) {
    console.warn(`Skipping note with invalid frequency from MIDI: ${midiNote}`);
    return;
  }

  const osc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, startTime);
  osc.connect(gainNode);
  gainNode.connect(audioContext.destination);

  const attackTime = 0.01;
  const releaseTime = 0.05;
  const actualDuration = Math.max(0.05, duration - releaseTime);

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(0.7, startTime + attackTime);
  gainNode.gain.setValueAtTime(0.7, startTime + actualDuration);
  gainNode.gain.linearRampToValueAtTime(0, startTime + actualDuration + releaseTime);

  osc.start(startTime);
  osc.stop(startTime + actualDuration + releaseTime + 0.01);
};

const playNotes = async () => {
  if (playing.value || notes.value.length === 0 || !audioContext) return;

  playing.value = true;
  generationError.value = null;

  if (audioContext.state === 'suspended') {
    try {
      await audioContext.resume();
      console.log("AudioContext resumed.");
    } catch (err) {
      console.error("Failed to resume AudioContext:", err);
      generationError.value = "Could not start audio. Please interact with the page (e.g., click) and try again.";
      playing.value = false;
      return;
    }
  }

  const currentAudioTime = audioContext.currentTime;
  const timeBetweenNotes = speed.value;
  const notePlayDuration = noteDuration.value;

  notes.value.forEach((note, index) => {
    const startTime = currentAudioTime + index * timeBetweenNotes;
    playNote(note, startTime, notePlayDuration);
  });

  const lastNoteStartTime = currentAudioTime + (notes.value.length - 1) * timeBetweenNotes;
  const attackTime = 0.01;
  const releaseTime = 0.05;
  const actualDuration = Math.max(0.05, notePlayDuration - releaseTime);
  const lastNoteEndTime = lastNoteStartTime + actualDuration + releaseTime + 0.01;

  const waitDuration = Math.max(0, lastNoteEndTime - currentAudioTime);

  await new Promise(resolve => setTimeout(resolve, waitDuration * 1000));

  playing.value = false;
};

const playNoteOnce = (midiNote) => {
  if (!audioContext || midiNote === null) return;
  
  // Resume audio context if needed (for browsers that require user interaction)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  const currentTime = audioContext.currentTime;
  const noteDuration = 0.5; // Half second duration for the clicked note
  
  // Set flag for clicked note playing (doesn't trigger the "Playing..." message)
  isPlayingClickedNote.value = true;
  
  // Play the note
  playNote(midiNote, currentTime, noteDuration);
  
  // Reset flag after the note finishes
  setTimeout(() => {
    isPlayingClickedNote.value = false;
  }, noteDuration * 1000 + 100);
};
</script>