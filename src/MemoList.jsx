import React from "react";

const MemoList = ({ memos, selectMemo }) => {
  return (
    <ul>
      {memos.map((memo) => (
        <li key={memo.id}>
          <a href="#" onClick={() => selectMemo(memo)}>
            {memo.text.split("\n")[0]}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MemoList;
