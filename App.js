import React, { Component } from "react";
import { AppRegistry, StyleSheet, Dimensions, View } from "react-native";
import { GameLoop } from "react-native-game-engine";
 
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const RADIUS = 25;

const obstacleTypes = {
    small: {
        color: '#EC9A29',
        size: 10,
        bounceHeight: HEIGHT * 0.7,
        maxStartHeight: HEIGHT * 0.5,
        speed: 4,
    },
    medium: {
        color: '#0F8B8D',
        size: 40,
        bounceHeight: HEIGHT * 0.5,
        maxStartHeight: HEIGHT * 0.4,
        speed: 3,
    },
    large: {
        color: '#ADD8E6',
        size: 80,
        bounceHeight: HEIGHT * 0.3,
        maxStartHeight: HEIGHT * 0.2,
        speed: 2,
    },
};
 
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      player: {
        x: WIDTH / 2 - RADIUS,
        y: HEIGHT - (RADIUS * 2),
      },
      gameIsInProgress: false,
      gameOver: false,
      score: 0,
      highscore: 0,
      obstacles: [],
      obstacleGeneratorInterval: undefined,
    };
  }

  componentDidMount() {
    this.setState({
      gameIsInProgress: true,
      obstacleGeneratorInterval: setInterval(this.addObstacle, 1000),
    })
  }

  // Add a new obstacle
  addObstacle = () => {
    var newObstacleType = Object.keys(obstacleTypes)[Math.floor(Math.random() * Object.keys(obstacleTypes).length)];
    var direction = Math.random() > 0.5 ? 1 : -1;
    var obstacle = {
        type: obstacleTypes[newObstacleType],
        x: direction === 1 ? 0 : (WIDTH - obstacleTypes[newObstacleType].size),
        y: obstacleTypes[newObstacleType].maxStartHeight - Math.floor(Math.random() * obstacleTypes[newObstacleType].maxStartHeight),
        dx: direction,
        dy: 1,
    };
    // console.log(obstacle);
    this.setState(prevState => ({
      obstacles: [...prevState.obstacles, obstacle],
      score: prevState.score + 1,
    }));

    // document.getElementById('scoreValue').innerHTML = score;
  };
 
  updateHandler = ({ touches, screen, time }) => {
    // console.log(touches);
    // console.log(time);
    // console.log(screen);
    let touch = touches.find(touch => (touch.type === "move" || touch.type === "start" || touch.type === "end"));
    if (touch) {
      const dx = (touch.event.pageX > WIDTH / 2) ? 5 : -5;
      this.setState(prevState => {
        let newXPosition = prevState.player.x + dx;
        if (newXPosition > WIDTH - RADIUS * 2) {
          newXPosition = WIDTH - RADIUS * 2;
        } else if (newXPosition < 0) {
          newXPosition = 0;
        }
        return {
          player: {
            ...prevState.player,
            x: newXPosition,
          },
        };
      });
    }
  };
 
  render() {
    return (
      <GameLoop style={styles.container} onUpdate={this.updateHandler}>
        <View style={[styles.player, { left: this.state.player.x, top: this.state.player.y }]} />
        { this.state.obstacles.map((obstacle, index) => (
          <View key={index} style={[styles[obstacle.type], { left: 50, top: 50 }]} />
        ))}
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
  },
  small: {
    position: 'absolute',
    backgroundColor: '#EC9A29',
    width: 10,
    height: 10,
    borderRadius: 10, 
  },
  medium: {
    position: 'absolute',
    backgroundColor: '#0F8B8D',
    width: 40,
    height: 40,
    borderRadius: 40, 
  },
  large: {
    position: 'absolute',
    backgroundColor: '#ADD8E6',
    width: 80,
    height: 80,
    borderRadius: 80, 
  },
});
