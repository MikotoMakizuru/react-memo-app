import React, { useState, useEffect } from "react";

const MemoForm = ({
  addMemo,
  selectedMemo,
  deleteMemo,
  editMemo,
  setSelectedMemo,
}) => {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedMemo) {
      setText(selectedMemo.text);
      setIsEditing(true);
    }
  }, [selectedMemo]);

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
            <label>
              メモ
              <br />
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="メモを入力してください"
              />
            </label>
          </div>
          <div>
            {isEditing ? (
              <>
                <button type="button" onClick={handleEdit}>
                  編集
                </button>
                <button type="button" onClick={handleDelete}>
                  削除
                </button>
              </>
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
        <a href="#" onClick={openForm}>
          ＋
        </a>
      )}
    </div>
  );
};

export default MemoForm;
