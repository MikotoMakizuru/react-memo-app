import React from "react";

const MemoList = ({ memos, selectMemo }) => {
  return (
    <ul>
      {memos.map((memo, index) => (
        <li key={index}>
          <a href="#" onClick={() => selectMemo(index)}>
            {memo.split("\n")[0]}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MemoList;
