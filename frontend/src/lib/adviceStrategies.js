// Strategy Design Pattern for GarageIQ 

class AdviceStrategy {
    getQuestion(question) {
      return question;
    }
  }
  
  class PerformanceStrategy extends AdviceStrategy {
    getQuestion(question) {
      return `Focus on horsepower, acceleration, and engine performance. ${question}`;
    }
  }
  
  class HandlingStrategy extends AdviceStrategy {
    getQuestion(question) {
      return `Focus on handling, suspension, and cornering. ${question}`;
    }
  }
  
  class GeneralStrategy extends AdviceStrategy {
    getQuestion(question) {
      return question;
    }
  }
  
  class AdviceContext {
    constructor(strategy) {
      this.strategy = strategy;
    }
  
    setStrategy(strategy) {
      this.strategy = strategy;
    }
  
    getQuestion(question) {
      return this.strategy.getQuestion(question);
    }
  }
  
  export {
    AdviceStrategy,
    PerformanceStrategy,
    HandlingStrategy,
    GeneralStrategy,
    AdviceContext
  };