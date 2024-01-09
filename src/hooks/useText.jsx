import { useState } from "react";
import { initialText } from "../utils/initialText";

function useText() {
  const [text, setText] = useState(initialText);

  return { text, setText };
}

export default useText;
