import * as Haptics from 'expo-haptics';

export async function safeImpact() {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {
    /* haptics optional */
  }
}

export async function safeSelection() {
  try {
    await Haptics.selectionAsync();
  } catch {
    /* haptics optional */
  }
}

export async function safeNotification() {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {
    /* haptics optional */
  }
}
