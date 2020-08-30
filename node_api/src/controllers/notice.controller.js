const expressAsyncHandler = require('express-async-handler');
const {
  createNotice,
  findNoticeById,
  updateNoticeById,
} = require('../services/notice.service');

module.exports.createNotice = expressAsyncHandler(async (req, res) => {
  const { notice } = await createNotice({
    UserId: req.user.id,
    requestBody: req.body,
  });
  res.status(201).json(notice);
});

module.exports.getNoticeList = expressAsyncHandler(async (req, res) => {
  res.status(200).json(req.advancedResults);
});

module.exports.getNotice = expressAsyncHandler(async (req, res) => {
  const notice = req.notice;
  await notice.increment('view', { by: 1 });
  const { notice: result } = await findNoticeById({
    noticeId: req.params.noticeId,
  });
  req.notice = null;

  res.status(200).json(result);
});

module.exports.editNotice = expressAsyncHandler(async (req, res) => {
  await updateNoticeById({
    requestBody: req.body,
    noticeId: req.params.noticeId,
  });
  const { notice: result } = await findNoticeById({
    noticeId: req.params.noticeId,
  });
  req.notice = null;

  res.status(200).json(result);
});

module.exports.deleteNotice = expressAsyncHandler(async (req, res) => {
  const notice = req.notice;
  await notice.destroy();
  req.notice = null;
  res.status(200).json(parseInt(req.params.noticeId, 10));
});
