import { orchestrator } from 'satcheljs';
import { chatQuestionAPI } from '../../../apis';
import { updateChatStackAction, updateLoadingAnswerAction } from '../mutator-action';
import { getAnswerAction } from '../action';
import { chatStackSelector } from '../selector';

orchestrator(getAnswerAction, async ({ question }) => {
  updateLoadingAnswerAction(true);

  const oldStack = chatStackSelector();

  try {
    const { data } = await chatQuestionAPI(question);

    if (data.apiStatusCode === 0) {
      oldStack?.push({ isClient: false, text: data.returnData });

      updateChatStackAction(oldStack || []);
    }
  } catch (error) {
    console.log('Something goes wrong!');
  } finally {
    updateLoadingAnswerAction(false);
  }
});
