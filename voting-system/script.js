const poll = new Map();

// Add a new voting option
function addOption(option) {
  if (option === "") {
    return "Option cannot be empty.";
  }

  if (poll.has(option)) {
    return `Option "${option}" already exists.`;
  }

  poll.set(option, new Set());

  return `Option "${option}" added to the poll.`;
}

// Allow someone to vote
function vote(option, voterId) {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }

  const voters = poll.get(option);

  if (voters.has(voterId)) {
    return `Voter ${voterId} has already voted for "${option}".`;
  }

  voters.add(voterId);

  return `Voter ${voterId} voted for "${option}".`;
}

// Show how many votes each option received
function displayResults() {
  let results = "Poll Results:";

  for (const [option, voters] of poll) {
    results += `\n${option}: ${voters.size} votes`;
  }

  return results;
}

// Create the voting options
addOption("Turkey");
addOption("Morocco");
addOption("Spain");

// Add some example votes
vote("Turkey", "voter1");
vote("Turkey", "voter2");
vote("Morocco", "voter3");

// Display results in the console
console.log(displayResults());
