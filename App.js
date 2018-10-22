import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View } from "react-native";
import { GameLoop } from "react-native-game-engine";
 
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const RADIUS = 25;
 
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: HEIGHT / 2 - RADIUS,
    };
  }
 
  updateHandler = ({ touches, screen, time }) => {
    // console.log(touches);
    // console.log(time);
    // console.log(screen);
    let touch = touches.find(x => (x.type === "move" || x.type === "start" || x.type === "end"));
    if (touch) {
      const dy = (touch.event.pageY > HEIGHT / 2) ? 5 : -5;
      this.setState(prevState => {
        let newYPosition = prevState.y + dy;
        if (newYPosition > HEIGHT - RADIUS * 2) {
          newYPosition = HEIGHT - RADIUS * 2;
        } else if (newYPosition < 0) {
          newYPosition = 0;
        }
        return {
          y: newYPosition
        };
      });
    }
  };
 
  render() {
    return (
      <GameLoop style={styles.container} onUpdate={this.updateHandler}>
        <View style={[styles.player, { left: this.state.x, top: this.state.y }]} />
      </GameLoop>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  player: {
    position: "absolute",
    backgroundColor: "pink",
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS * 2
  }
});
