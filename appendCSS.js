const fs = require('fs');
let css = fs.readFileSync('src/app/page.module.css', 'utf8');
css += `
.colListItem {
  flex-direction: column;
  padding: 0;
}

.colListItemHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  width: 100%;
}

.colListItemHeader:hover {
  background: #f8fafc;
}

.postExpandedBody {
  padding: 12px 16px;
  background: #f8fafc;
  border-top: 1px dashed #e2e8f0;
  animation: slideDown 0.2s ease-out forwards;
  transform-origin: top;
  width: 100%;
  box-sizing: border-box;
}

@keyframes slideDown {
  from { opacity: 0; transform: scaleY(0.95); }
  to { opacity: 1; transform: scaleY(1); }
}

.postContent {
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 16px;
  white-space: pre-wrap;
  word-break: keep-all;
}

.postReplies {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.postReply {
  font-size: 12px;
  background: #ffffff;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.replyAuthor {
  font-weight: 700;
  color: #f43f5e;
  font-size: 11px;
}

.replyText {
  color: #334155;
  line-height: 1.4;
}

.replyInputWrapper {
  display: flex;
  gap: 8px;
}

.replyInput {
  flex: 1;
  padding: 8px 12px;
  font-size: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
}

.replyInput:focus {
  border-color: #f43f5e;
}

.replyBtn {
  background: #f43f5e;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0 14px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.replyBtn:hover {
  background: #e11d48;
}
`;
fs.writeFileSync('src/app/page.module.css', css);
console.log('done');
