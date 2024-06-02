import React, { useState, useEffect } from "react";
import MemoForm from "./MemoForm";
import MemoList from "./MemoList";

const App = () => {
  const [memos, setMemos] = useState(
    JSON.parse(localStorage.getItem("memos")) || [],
  );
  const [selectedMemo, setSelectedMemo] = useState(null);

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  const addMemo = (memo) => {
    setMemos([...memos, memo]);
  };

  const selectMemo = (index) => {
    setSelectedMemo({ memo: memos[index], index });
  };

  const deleteMemo = (index) => {
    const updatedMemos = memos.filter((_, i) => i !== index);
    setMemos(updatedMemos);
    setSelectedMemo(null);
  };

  const editMemo = (updatedMemo, index) => {
    const updatedMemos = memos.map((memo, i) =>
      i === index ? updatedMemo : memo,
    );
    setMemos(updatedMemos);
    setSelectedMemo(null);
  };

  return (
    <div>
      <header>
        <MemoList memos={memos} selectMemo={selectMemo} />
      </header>
      <MemoForm
        addMemo={addMemo}
        selectedMemo={selectedMemo}
        deleteMemo={deleteMemo}
        editMemo={editMemo}
      />
    </div>
  );
};

export default App;
