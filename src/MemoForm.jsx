import React, { useState, useEffect } from "react";

const MemoForm = ({ addMemo, selectedMemo, deleteMemo, editMemo }) => {
  const [memo, setMemo] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedMemo) {
      setMemo(selectedMemo.memo);
      setIsVisible(true);
      setIsEditing(true);
    }
  }, [selectedMemo]);

  const handleFormToggle = () => {
    setIsVisible((prevVisible) => !prevVisible);
    setMemo("");
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memo.trim() === "") return;
    addMemo(memo);
    setMemo("");
    handleFormToggle();
  };

  const handleDelete = () => {
    if (selectedMemo) {
      deleteMemo(selectedMemo.index);
      setMemo("");
      handleFormToggle();
    }
  };

  const handleEdit = () => {
    if (selectedMemo.memo === memo) return;
    editMemo(memo, selectedMemo.index);
    setMemo("");
    handleFormToggle();
  };

  return (
    <div>
      {isVisible ? (
        <form onSubmit={handleSubmit}>
          <label>
            <div>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="メモを入力してください"
              />
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
                  <button type="button" onClick={handleFormToggle}>
                    キャンセル
                  </button>
                  <button type="submit">作成</button>
                </>
              )}
            </div>
          </label>
        </form>
      ) : (
        <a href="#" onClick={handleFormToggle}>
          ＋
        </a>
      )}
    </div>
  );
};

export default MemoForm;
