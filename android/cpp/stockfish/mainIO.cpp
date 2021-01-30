#include "mainIO.h"
#include <mutex>

std::queue<std::string> ouptutLines;
std::queue<std::string> inputCommands;

std::mutex outputLock; 

std::string readNextOutputLine() {
  outputLock.lock();
  
  if (ouptutLines.empty()) {
    outputLock.unlock();
      return std::string("#ERROR: no available line to read !");
  }
  
  std::string line(ouptutLines.front());
  ouptutLines.pop();

  outputLock.unlock();

  return line;
}

void sendCommand(std::string command) {
  inputCommands.push(command);
}