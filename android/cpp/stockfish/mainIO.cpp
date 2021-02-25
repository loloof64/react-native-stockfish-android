#include "mainIO.h"
#include <mutex>

std::queue<std::string> ouptutLines;
std::queue<std::string> inputCommands;

std::mutex outputLock; 

std::string readNextOutputLine() {
  std::string valueToReturn;
  outputLock.lock();
  
  if (ouptutLines.empty()) {
    valueToReturn = std::string("#ERROR: no available line to read !");
  }
  else {
    valueToReturn = ouptutLines.front();
    ouptutLines.pop();  
  }
  
  outputLock.unlock();
  return valueToReturn;
}

void sendCommand(std::string command) {
  inputCommands.push(command);
}