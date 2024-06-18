import "./styles.css";

interface SnakePart {
  x: number;
  y: number;
  head: number;
  tail: number;
}

class SnakeGame {
  private lastTime: number = 0;
  private snakeLength: number = 0;
  private f: number = 0;
  private gameBoard: HTMLElement = document.getElementById("game-board")!;
  private snakeDirection: { x: number; y: number } = { x: 0, y: 1 };
  private snakeBody: SnakePart[] = [{ x: 9, y: 9, head: 1, tail: 2 }];
  private apple: { x: number; y: number } = { x: 9, y: 18 };

  constructor() {
    window.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (this.f === 1) return;
    switch (e.key) {
      case "ArrowUp":
        if (this.snakeDirection.x === 1) break;
        this.f = 1;
        this.snakeDirection = { x: -1, y: 0 };
        break;
      case "ArrowDown":
        if (this.snakeDirection.x === -1) break;
        this.f = 1;
        this.snakeDirection = { x: 1, y: 0 };
        break;
      case "ArrowRight":
        if (this.snakeDirection.y === -1) break;
        this.f = 1;
        this.snakeDirection = { x: 0, y: 1 };
        break;
      case "ArrowLeft":
        if (this.snakeDirection.y === 1) break;
        this.f = 1;
        this.snakeDirection = { x: 0, y: -1 };
        break;
    }
  }

  private newApple(): void {
    let mbapple = {
      x: Math.floor(Math.random() * 21) + 1,
      y: Math.floor(Math.random() * 21) + 1,
    };
    if (this.snakeBody.some((el) => el.x === mbapple.x && el.y === mbapple.y)) {
      this.newApple();
    } else {
      this.apple = mbapple;
    }
  }

  private snakeMoving(snakeDirection: { x: number; y: number }): void {
    this.gameBoard.innerHTML = "";
    let head = {
      x: this.snakeBody[this.snakeLength].x + snakeDirection.x,
      y: this.snakeBody[this.snakeLength].y + snakeDirection.y,
    };
    if (
      head.x === 22 ||
      head.y === 22 ||
      head.x === 0 ||
      head.y === 0 ||
      this.snakeBody.some((el) => el.x === head.x && el.y === head.y)
    ) {
      this.snakeLength = 0;
      this.snakeBody = [];
      head = { x: 9, y: 9, head: 1, tail: 2 };
      this.newApple();
      this.snakeBody.push(head);
    }
    if (head.x === this.apple.x && head.y === this.apple.y) {
      this.snakeBody.push(head);
      this.snakeLength++;
      this.newApple();
    } else {
      this.snakeBody.push(head);
      this.snakeBody.shift();
    }
    this.snakeBody.forEach((part) => {
      const snakePart = document.createElement("div");
      snakePart.style.gridRowStart = part.x.toString();
      snakePart.style.gridColumnStart = part.y.toString();
      snakePart.classList.add("snake");
      this.gameBoard.appendChild(snakePart);
    });
    const applesnake = document.createElement("div");
    applesnake.style.gridRowStart = this.apple.x.toString();
    applesnake.style.gridColumnStart = this.apple.y.toString();
    applesnake.classList.add("apple");
    this.gameBoard.appendChild(applesnake);
    this.f = 0;
  }

  private af(timeStamp: number): void {
    window.requestAnimationFrame(this.af.bind(this));
    const sslr = (timeStamp - this.lastTime) / 150;
    if (sslr <= 1) return;
    this.lastTime = timeStamp;
    this.snakeMoving(this.snakeDirection);
  }

  start(): void {
    this.af(0);
  }
}

new SnakeGame().start();