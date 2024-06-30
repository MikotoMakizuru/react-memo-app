import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const MemoForm = ({
  addMemo,
  selectedMemo,
  deleteMemo,
  editMemo,
  setSelectedMemo,
}) => {
  const [text, setText] = useState("");
  const { auth } = useAuth();

  useEffect(() => {
    if (selectedMemo) {
      setText(selectedMemo.text);
    }
  }, [selectedMemo]);

  useEffect(() => {
    if (!auth.isLogin) {
      closeForm();
    }
  }, [auth.isLogin]);

  const openForm = () => {
    setSelectedMemo("");
  };

  const closeForm = () => {
    setSelectedMemo(null);
    setText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    addMemo(text);
    setText("");
    closeForm();
  };

  const handleDelete = () => {
    if (!selectedMemo) return;
    deleteMemo(selectedMemo.id);
    setText("");
    closeForm();
  };

  const handleEdit = () => {
    if (selectedMemo.text === text) return;
    editMemo(text, selectedMemo.id);
    setText("");
    closeForm();
  };

  return (
    <div>
      {selectedMemo !== null ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>メモ</label>
            <br />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="メモを入力してください"
            />
          </div>
          <div>
            {selectedMemo !== "" ? (
              auth.isLogin && (
                <>
                  <button type="button" onClick={handleEdit}>
                    編集
                  </button>
                  <button type="button" onClick={handleDelete}>
                    削除
                  </button>
                </>
              )
            ) : (
              <>
                <button type="button" onClick={closeForm}>
                  キャンセル
                </button>
                <button type="submit">作成</button>
              </>
            )}
          </div>
        </form>
      ) : (
        auth.isLogin && (
          <a href="#" onClick={openForm}>
            ＋
          </a>
        )
      )}
    </div>
  );
};

export default MemoForm;
