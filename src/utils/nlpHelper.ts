function detectIntent(message: string): string {
  if (message.includes('こんにちは')) {
    return 'greeting';
  }
  if (message.includes('天気')) {
    return 'weather';
  }
  return 'unknown';
}

function responseGenerator(intent: string, context: any): string {
  if (intent === 'greeting') {
    return 'こんにちは！';
  }
  if (intent === 'weather') {
    return '今日の天気は晴れです。';
  }
  return 'すみません、わかりません。';
}

function updateContext(context: any, intent: string, response: string) {
  context.lastIntent = intent;
  context.lastResponse = response;
}

function handleUnknown() {
  return 'すみません、わかりません。';
}

export function processUserMessage(message: string, context: any) {
  const intent = detectIntent(message);
  let response = '';

  if (intent !== 'unknown') {
    response = responseGenerator(intent, context);
    updateContext(context, intent, response);
  } else {
    response = handleUnknown();
  }

  return response;
}
