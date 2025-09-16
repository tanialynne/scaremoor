// Simple test to check worksheet generation
const { FORGOTTEN_DOOR_STORY, THE_PENCIL_STORY, getStoryBySlug } = require('./src/app/constants/StoryContent.ts');
const { buildOnlineWorksheetsForStory } = require('./src/app/utils/StoryBuilder.ts');

console.log('Testing worksheet generation...');

// Test getting The Pencil story
const pencilStory = getStoryBySlug('the-pencil');
console.log('Pencil story found:', pencilStory ? pencilStory.title : 'null');

if (pencilStory) {
  console.log('Pencil worksheet templates:', pencilStory.worksheetTemplates);

  // Test building worksheets
  const worksheets = buildOnlineWorksheetsForStory(pencilStory);
  console.log('Generated worksheets:', worksheets.length);

  worksheets.forEach(worksheet => {
    console.log(`- ${worksheet.id}: ${worksheet.sections.length} sections`);
    worksheet.sections.forEach(section => {
      console.log(`  - ${section.id}: ${section.title}`);
    });
  });
}