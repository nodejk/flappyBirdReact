import { EventHandler } from "react";
import { StringLiteralLike } from "typescript";
import { Pipe } from "./components/Pipe";

export interface TodoPropsBird {
  x: number;
  y: number;
  imgPath: string;
  coordinateHandler: any;
  lastFlap?: number;
  flap?: boolean;
  currentFlap?: number;
  max_jump?: number;
}

export interface birdcoordinates {
  xRight: number;
  xLeft: number;
  yTop: number;
  yBottom: number;
}

export interface TodoPropsPipeSys {
  upperPipeImgPath: string;
  lowerPipeImgPath: string;
  scale: number;
  gap: number;
  speed: number;
  coordinateHandler: any;
}

export interface TodoPropsPipe {
  upperPipeImgPath: string;
  lowerPipeImgPath: string;
  scale: number;
  keyId: any;
  xPipeRight: number;
  xPipeLeft: number;
  yLowerPipe: number;
  yUpperPipe: number;
  yUpperPipeEdge: number;
}

export interface buttonInterface {
  displayString: String;
  onClick: any;
}

export interface inputPropsInterface {
  onChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
  type: string;
  id: string;
  label: string;
  value: string;
}

export interface inputFormInterface {
  value: string;
  isValid: boolean;
}

export interface actionFormInterface {
  type: string;
  value: string;
  formValidLogic: (value: string) => boolean;
}

export interface loginCredentials {
  uid: string;
  email: string;
  password: string;
}

export interface scoreRequestconfiguration {
  uid: string;
  path: string;
}

export interface scoreBoardInterface {
  userEmail?: string;
  score: string;
  timestamp: string;
  timeStampSort?: Date;
}

// export interface TodoPropsPipeSys {
//   pipe: Pipe;
// }

// export interface pipeCoordinates {
//   xPipeRight: number;
//   xPipeLeft: number;
//   yLowerPipe: number;
//   yUpperPipe: number;
// }
