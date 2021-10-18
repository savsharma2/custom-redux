// define a class
class Pubsub {
  // each instance of the Observer class
  // starts with an empty object
  // that react to a state change
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
    if (!subscribers[event]) {
      subscribers[event] = [];
    }
    subscribers[event].push(callback);
    const index = subscribers[event].length - 1;
    return {
      unsubscribe() {
        subscribers[event].splice(index, 1);
      }
    };
  }

  publish(event, data) {
    if (!subscribers[event]) return;
    subscribers[event].forEach((subscriberCallback) =>
      subscriberCallback(data)
    );
  }
}
