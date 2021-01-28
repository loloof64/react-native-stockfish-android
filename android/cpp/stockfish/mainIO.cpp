#include "mainIO.h"

std::queue<std::string> ouptutLines;
std::queue<std::string> inputCommands;

std::string readNextOutputLine() {
  if (ouptutLines.empty()) {
      return std::string("#ERROR: no available line to read !");
  }
  
  std::string line(ouptutLines.front());
  ouptutLines.pop();

  return line;
}

void sendCommand(std::string command) {
  inputCommands.push(command);
}