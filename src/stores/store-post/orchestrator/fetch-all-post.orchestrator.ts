import { orchestrator } from 'satcheljs';
import { loadAllPostAPI } from '../../../apis';
import { fetchAllPostAction } from '../action';
import { updateAllPostAction, updateLoadingAllPostAction } from '../mutator-action';

orchestrator(fetchAllPostAction, async () => {
  updateLoadingAllPostAction(true);

  try {
    const { data: allPost } = await loadAllPostAPI();

    updateAllPostAction(allPost);
  } catch (error) {
    // updateFetchProfileError(error);
  } finally {
    updateLoadingAllPostAction(false);
  }
});
