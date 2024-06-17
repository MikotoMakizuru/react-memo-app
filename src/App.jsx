import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthProvider } from "./AuthContext";
import MemoForm from "./MemoForm";
import MemoList from "./MemoList";
import Auth from "./Auth";

const App = () => {
  const [memos, setMemos] = useState(
    JSON.parse(localStorage.getItem("memos")) || [],
  );
  const [selectedMemo, setSelectedMemo] = useState(null);

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  const addMemo = (memo) => {
    const newMemo = { id: uuidv4(), text: memo };
    setMemos([...memos, newMemo]);
  };

  const selectMemo = (memo) => {
    setSelectedMemo(memo);
  };

  const deleteMemo = (memoId) => {
    const updatedMemos = memos.filter((memo) => memo.id !== memoId);
    setMemos(updatedMemos);
    setSelectedMemo(null);
  };

  const editMemo = (updatedText, memoId) => {
    const updatedMemos = memos.map((memo) => {
      if (memo.id === memoId) {
        memo.text = updatedText;
      }
      return memo;
    });
    setMemos(updatedMemos);
    setSelectedMemo(null);
  };

  return (
    <AuthProvider>
      <div>
        <header>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Auth />
          </div>
        </header>
        <MemoList memos={memos} selectMemo={selectMemo} />
        <MemoForm
          addMemo={addMemo}
          selectedMemo={selectedMemo}
          deleteMemo={deleteMemo}
          editMemo={editMemo}
          setSelectedMemo={setSelectedMemo}
        />
      </div>
    </AuthProvider>
  );
};

export default App;
