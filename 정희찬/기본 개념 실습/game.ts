/**
 * Let's make a game 🕹
 */
// switch case에서 break문 꼭 사용해야한다. - return 없을 경우에 필히 작성.
// 사용하지 않으면 다른 나머지 case도 모두 동작하게됨.
{
  type Command = "up" | "down" | "left" | "right";
  type Position = {
    x: number;
    y: number;
  };
  const position: Position = {
    x: 0,
    y: 0,
  };
  const move = (command: Command): void => {
    switch (command) {
      case "up":
        position.y += 1;
        break;
      case "down":
        position.y -= 1;
        break;
      case "left":
        position.x -= 1;
        break;
      case "right":
        position.x += 1;
        break;
      default:
        Error("unknown command");
    }
    return;
  };

  // 강의에서 나온 코드
  //   const position= {
  //     x: 0,
  //     y: 0,
  //   };
  //   const move = (direction: "up" | "down" | "left" | "right") => {
  //     switch (direction) {
  //       case "up":
  //         position.y += 1;
  //         break;
  //       case "down":
  //         position.y -= 1;
  //         break;
  //       case "left":
  //         position.x -= 1;
  //         break;
  //       case "right":
  //         position.x += 1;
  //         break;
  //       default:
  //         Error("unknown direction");
  //     }
  //   };

  console.log(position); // { x: 0, y: 0}
  move("up");
  console.log(position); // { x: 0, y: 1}
  move("down");
  console.log(position); // { x: 0, y: 0}
  move("left");
  console.log(position); // { x: -1, y: 0}
  move("right");
  console.log(position); // { x: 0, y: 0}
}
