/**
 * Let's make a game ๐น
 */
// switch case์์ break๋ฌธ ๊ผญ ์ฌ์ฉํด์ผํ๋ค. - return ์์ ๊ฒฝ์ฐ์ ํํ ์์ฑ.
// ์ฌ์ฉํ์ง ์์ผ๋ฉด ๋ค๋ฅธ ๋๋จธ์ง case๋ ๋ชจ๋ ๋์ํ๊ฒ๋จ.
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

  // ๊ฐ์์์ ๋์จ ์ฝ๋
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
