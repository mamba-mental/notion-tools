{
    object: 'database',
    id: '26d43632-ae04-4da5-853b-736531b3d40b',
    cover: null,
    icon: {
      type: 'external',
      external: { url: 'https://www.notion.so/icons/movie-clapboard_red.svg' }
    },
    created_time: '2024-08-05T18:03:00.000Z',
    created_by: { object: 'user', id: '01b92c2b-5a38-495d-a82b-922f47b3a308' },
    last_edited_by: { object: 'user', id: '01b92c2b-5a38-495d-a82b-922f47b3a308' },
    last_edited_time: '2024-08-29T18:59:00.000Z',
    title: [
      {
        type: 'text',
        text: { content: 'Content [DEV-19]', link: null },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: 'default'
        },
        plain_text: 'Content [DEV-19]',
        href: null
      }
    ],
    description: [
      {
        type: 'text',
        text: {
          content: 'This is the primary/source database for all content projects in Creator’s Companion – all of your videos, podcast episodes, articles, courses, etc. All of your content projects are contained in this database; the Content views throughout Creator’s Companion are linked views of this database with unique sets of filters, sorts, and display criteria that make them more useful. ',
          link: null
        },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: 'default'
        },
        plain_text: 'This is the primary/source database for all content projects in Creator’s Companion – all of your videos, podcast episodes, articles, courses, etc. All of your content projects are contained in this database; the Content views throughout Creator’s Companion are linked views of this database with unique sets of filters, sorts, and display criteria that make them more useful. ',
        href: null
      },
      {
        type: 'text',
        text: {
          content: 'You should only ever need to interact with this main database when making changes to it. If you need to make a change, first unlock the database by clicking the “Locked” button above if it exists.',
          link: null
        },
        annotations: {
          bold: true,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: 'default'
        },
        plain_text: 'You should only ever need to interact with this main database when making changes to it. If you need to make a change, first unlock the database by clicking the “Locked” button above if it exists.',
        href: null
      }
    ],
    is_inline: false,
    properties: {
      Writer: {
        id: '%3D%40S%60',
        name: 'Writer',
        description: 'If this video has a specific writer, add them here.',
        type: 'people',
        people: {}
      },
      'Sponsor Performance': {
        id: 'A%60zd',
        name: 'Sponsor Performance',
        description: "If you're working with sponsors who provide performance data, you can tag sponsored posts by their relative performance here.\n" +
          '\n' +
          "This is a select property, as many sponsors don't share exact conversion data.\n" +
          '\n' +
          'Unlock the Content database to add new options.',
        type: 'select',
        select: {
          options: [
            {
              id: 'a_gW',
              name: 'Great',
              color: 'green',
              description: null
            },
            {
              id: 'bUeL',
              name: 'Good',
              color: 'yellow',
              description: null
            },
            {
              id: 'gcd~',
              name: 'Okay',
              color: 'orange',
              description: null
            },
            { id: 'j{d`', name: 'Poor', color: 'red', description: null }
          ]
        }
      },
      Views: {
        id: 'AtJ%7B',
        name: 'Views',
        description: 'The number of views this piece of content has gained (or pageviews for blog content, streams/downloads for podcast episodes, etc.)\n' +
          '\n' +
          'You can input this data manually, or pull it in via APIs such as the YouTube Data API.',
        type: 'number',
        number: { format: 'number' }
      },
      'Focus Keywords': {
        id: 'CmMI',
        name: 'Focus Keywords',
        description: "Any keywords you're focusing on ranking for with this piece of content. Used mainly for SEO-focused written content.\n" +
          '\n' +
          'This Relation property connects to the Associated Content Relation property in the Keywords database.',
        type: 'relation',
        relation: {
          database_id: 'a6575a26-b243-4c33-bf4c-47ffbf38077e',
          type: 'dual_property',
          dual_property: {
            synced_property_name: 'Associated Content',
            synced_property_id: 'vZRF'
          }
        }
      },
      Editor: {
        id: 'DuT%3D',
        name: 'Editor',
        description: 'If this video has a specific editor, add them here.',
        type: 'people',
        people: {}
      },
      Tags: {
        id: 'EOXq',
        name: 'Tags',
        description: "If you've defined multiple types of content within a single channel (often called Content Pillars), you can use this property to tag pieces of content with those types/pillars.\n" +
          '\n' +
          'Unlock the Content database to add new options.',
        type: 'multi_select',
        multi_select: {
          options: [
            {
              id: ';w\\t',
              name: 'Sample Tag',
              color: 'yellow',
              description: null
            }
          ]
        }
      },
      Paid: {
        id: 'F%3F%7Bo',
        name: 'Paid',
        description: 'Use this checkbox on sponsored content to mark whether or not the deal has been paid by the sponsor.',
        type: 'checkbox',
        checkbox: {}
      },
      Description: {
        id: 'GS%40%7D',
        name: 'Description',
        description: 'A short pitch for this piece of content. Useful when brain-dumping ideas in the Content Ideas page.',
        type: 'rich_text',
        rich_text: {}
      },
      'No.': {
        id: 'K%5DVe',
        name: 'No.',
        description: 'If you and/or your team number pieces of content manually, you can use this property to do so.\n' +
          '\n' +
          `This can be useful if you also add numbers to the names of the folders for each project in your computer's file system, or on a server. E.g. "047 – How to Gain Self Discipline".`,
        type: 'number',
        number: { format: 'number_with_commas' }
      },
      'Sponsor URL': {
        id: 'LOqS',
        name: 'Sponsor URL',
        description: "If this piece of content is sponsored, you can add the sponsor's landing page/promo link URL that you've been provided.",
        type: 'url',
        url: {}
      },
      'YouTube Chapters': {
        id: 'O%3FAy',
        name: 'YouTube Chapters',
        description: 'If you have B-Roll items related to this Content project with a Meta type of Chapter, this formula will create a YouTube chapter list from them and their timecodes.\n' +
          '\n' +
          'This formula expects timecodes to be in 00:00:00:00 format (hours:minutes:seconds:frames).',
        type: 'formula',
        formula: {
          expression: 'lets(\n' +
            '\tchapterMarkers, \n' +
            '\t{{notion:block_property:TBKn:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.filter(current.{{notion:block_property:E%5E%5ET:625176bc-12d6-4a29-8da6-b0af114fc06c:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.includes("Chapter")).sort(current.{{notion:block_property:pXuZ:625176bc-12d6-4a29-8da6-b0af114fc06c:191b1c83-1be7-4a60-80a2-6914a0773d1e}}).map(\n' +
            '\t\tcurrent.{{notion:block_property:pXuZ:625176bc-12d6-4a29-8da6-b0af114fc06c:191b1c83-1be7-4a60-80a2-6914a0773d1e}}\n' +
            '\t\t\t.replace("^(.*?):\\d{2}$", "$1")\n' +
            '\t\t\t.replace("^00:(\\d{2}:\\d{2})","$1")\n' +
            '\t\t+ " - " + current.{{notion:block_property:title:625176bc-12d6-4a29-8da6-b0af114fc06c:191b1c83-1be7-4a60-80a2-6914a0773d1e}}\n' +
            '\t),\n' +
            '\tif(\n' +
            '\t\tchapterMarkers.first().test("^00:00") or chapterMarkers.empty(),\n' +
            '\t\tchapterMarkers.join("\\n"),\n' +
            '\t\t"00:00 - Introduction\\n" + chapterMarkers.join("\\n")\n' +
            '\t)\n' +
            ')'
        }
      },
      'Pay Due Date': {
        id: 'OTtW',
        name: 'Pay Due Date',
        description: 'If this piece of content is sponsored, this property will return the date at which you should be paid.\n' +
          '\n' +
          "It is calculated based on the Publish Date of the content and the Sponsor's pay schedule setting (e.g. Net30 would pay 30 days after the publish date).",
        type: 'formula',
        formula: {
          expression: 'ifs(\n' +
            '\t{{notion:block_property:mXdN:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.empty(),\n' +
            '\t"".parseDate(),\n' +
            '\tlets(\n' +
            '\t\tsponsor,\n' +
            '\t\t{{notion:block_property:mXdN:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.first(),\n' +
            '\t\teomBuffer,\n' +
            '\t\tif(\n' +
            '\t\t\tsponsor.{{notion:block_property:N~dS:e8fd34fd-8a0b-456d-a53f-88ebb69553b7:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.test("EOM"),\n' +
            '\t\t\tdateBetween(\n' +
            '\t\t\t\t{{notion:block_property:hne%7C:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.dateAdd(1, "months").dateSubtract({{notion:block_property:hne%7C:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.date(), "days"),\n' +
            '\t\t\t\t{{notion:block_property:hne%7C:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}},\n' +
            '\t\t\t\t"days"\n' +
            '\t\t\t),\n' +
            '\t\t\t0\n' +
            '\t\t),\n' +
            '\t\tnetBuffer,\n' +
            '\t\tifs(\n' +
            '\t\t\tsponsor.{{notion:block_property:N~dS:e8fd34fd-8a0b-456d-a53f-88ebb69553b7:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.test("60"),\n' +
            '\t\t\t2,\n' +
            '\t\t\tsponsor.{{notion:block_property:N~dS:e8fd34fd-8a0b-456d-a53f-88ebb69553b7:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.test("30"),\n' +
            '\t\t\t1,\n' +
            '\t\t\t0\n' +
            '\t\t),\n' +
            '\t\tifs(\n' +
            '\t\t\tsponsor.{{notion:block_property:N~dS:e8fd34fd-8a0b-456d-a53f-88ebb69553b7:191b1c83-1be7-4a60-80a2-6914a0773d1e}} == "On Deal Close" or sponsor.{{notion:block_property:N~dS:e8fd34fd-8a0b-456d-a53f-88ebb69553b7:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.empty(),\n' +
            '\t\t\t"".parseDate(),\n' +
            '\t\t\tsponsor.{{notion:block_property:N~dS:e8fd34fd-8a0b-456d-a53f-88ebb69553b7:191b1c83-1be7-4a60-80a2-6914a0773d1e}} == "On Publish",\n' +
            '\t\t\t{{notion:block_property:hne%7C:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}},\n' +
            '\t\t\t{{notion:block_property:hne%7C:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.dateAdd(eomBuffer, "days").dateAdd(netBuffer, "months")\n' +
            '\t\t)\n' +
            '\t)\n' +
            ')'
        }
      },
      'Performance Notes': {
        id: 'SPH%60',
        name: 'Performance Notes',
        description: "Add any notes about this video's performance here.",
        type: 'rich_text',
        rich_text: {}
      },
      'B-Roll': {
        id: 'TBKn',
        name: 'B-Roll',
        description: 'B-Roll items that are related to this Content project.\n' +
          '\n' +
          'This Relation property connects to the Content relation property in the B-Roll database.',
        type: 'relation',
        relation: {
          database_id: '625176bc-12d6-4a29-8da6-b0af114fc06c',
          type: 'dual_property',
          dual_property: { synced_property_name: 'Content', synced_property_id: 'lSwJ' }
        }
      },
      Repurposing: {
        id: 'VP%60u',
        name: 'Repurposing',
        description: 'Use this Relation property to relate (or create) other content projects that represent repurposed versions of this content project.\n' +
          '\n' +
          'E.g. if this is a YouTube video, you may also want to create and track a blog post and several Shorts/TikToks.',
        type: 'relation',
        relation: {
          database_id: '26d43632-ae04-4da5-853b-736531b3d40b',
          type: 'single_property',
          single_property: {}
        }
      },
      Created: {
        id: '%5DG%40T',
        name: 'Created',
        description: 'The date and time at which this page was created.',
        type: 'created_time',
        created_time: {}
      },
      'Review Date': {
        id: '%5EtnG',
        name: 'Review Date',
        description: 'Use this to set a date at which this content should be reviewed or updated.\n' +
          '\n' +
          'For example, you may have a blog post that needs to be updated every year. \n' +
          '\n' +
          "In the Maintenance view, you'll see upcoming content that needs to be reviewed, ensuring you won't forget about it.",
        type: 'date',
        date: {}
      },
      URL: {
        id: 'dIbU',
        name: 'URL',
        description: 'The public URL for this piece of content, once uploaded/published.',
        type: 'url',
        url: {}
      },
      Archive: {
        id: 'fDb%7C',
        name: 'Archive',
        description: `Typically used for "archiving" old content ideas that you'd like to clear out of the majority of your Ideas views.\n` +
          '\n' +
          'Was called "Graveyard" in previous versions of this template.',
        type: 'checkbox',
        checkbox: {}
      },
      'Sponsor Rate': {
        id: 'gcC%5D',
        name: 'Sponsor Rate',
        description: 'If this piece of content is sponsored, enter the rate for it here.',
        type: 'number',
        number: { format: 'dollar' }
      },
      Stats: {
        id: 'hmg%40',
        name: 'Stats',
        description: 'Formats the numbers from Views, Likes, and Comments into a labeled, aesthetic property used on the Thumbnail view within the Completed section of certain Channel pages.',
        type: 'formula',
        formula: {
          expression: 'if(\n' +
            '\t{{notion:block_property:AtJ%7B:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.empty() and {{notion:block_property:%7BLv~:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.empty() and {{notion:block_property:ndUm:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.empty(),\n' +
            '\t"",\n' +
            '\tlets(\n' +
            '\t\tfirstCommaSetter,\n' +
            '\t\t"(\\d+)(\\d{3})",\n' +
            '\t\tsecondCommaSetter,\n' +
            '\t\t"(\\d+)(\\d{3},\\d{3})",\n' +
            '\t\tviews,\n' +
            '\t\tif(\n' +
            '\t\t\t{{notion:block_property:AtJ%7B:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.empty(),\n' +
            '\t\t\t"",\n' +
            '\t\t\t("👀 " + {{notion:block_property:AtJ%7B:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.\n' +
            '\t\t\t\treplace(firstCommaSetter,"$1,$2").\n' +
            '\t\t\t\treplace(secondCommaSetter,"$1,$2")\n' +
            '\t\t\t).style("c","b","green","green_background")\n' +
            '\t\t),\n' +
            '\t\tlikes,\n' +
            '\t\tif(\n' +
            '\t\t\t{{notion:block_property:%7BLv~:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.empty(),\n' +
            '\t\t\t"",\n' +
            '\t\t\t("👍 " + {{notion:block_property:%7BLv~:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.\n' +
            '\t\t\t\treplace(firstCommaSetter,"$1,$2").\n' +
            '\t\t\t\treplace(secondCommaSetter,"$1,$2")\n' +
            '\t\t\t).style("c","b","green","green_background")\n' +
            '\t\t),\n' +
            '\t\tcomments,\n' +
            '\t\tif(\n' +
            '\t\t\t{{notion:block_property:ndUm:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.empty(),\n' +
            '\t\t\t"",\n' +
            '\t\t\t("💬 " + {{notion:block_property:ndUm:00000000-0000-0000-0000-000000000000:191b1c83-1be7-4a60-80a2-6914a0773d1e}}.\n' +
            '\t\t\t\treplace(firstCommaSetter,"$1,$2").\n' +
            '\t\t\t\treplace(secondCommaSetter,"$1,$2")\n' +
            '\t\t\t).style("c","b","green","green_background")\n' +
            '\t\t),\n' +
            '\t\t[views, likes, comments].filter(!current.empty()).join("\\n")\n' +
            '\t)\n' +
            ')'
        }
      },
      'Publish Date': {
        id: 'hne%7C',
        name: 'Publish Date',
        description: 'The intended publish date of this piece of content. This date is used for the calendar view in the Project tracker. You can also update this date after a piece of content goes live in the case that it was published on a different date than planned.',
        type: 'date',
        date: {}
      },
      'Media Type': {
        id: 'i%3BF%5C',
        name: 'Media Type',
        description: 'Allows you to label this content project with its media type – e.g. Short, Long-Form, Stream, Written, etc.\n' +
          '\n' +
          'Useful as channels now allow you to post multiple types of media.\n' +
          '\n' +
          'Unlock the Content database to add more options.',
        type: 'select',
        select: {
          options: [
            {
              id: 'sXZK',
              name: 'Long-Form',
              color: 'red',
              description: null
            },
            {
              id: ']MYk',
              name: 'Short',
              color: 'green',
              description: null
            },
            {
              id: 'TInq',
              name: 'Stream',
              color: 'orange',
              description: null
            },
            {
              id: 'rbH\\',
              name: 'Audio',
              color: 'blue',
              description: null
            },
            {
              id: 'y_o`',
              name: 'Written',
              color: 'purple',
              description: null
            }
          ]
        }
      },
      Sponsor: {
        id: 'mXdN',
        name: 'Sponsor',
        description: "If this piece of content is sponsored, you can add the sponsor's page from the Sponsors database here.\n" +
          '\n' +
          'This relation property connected to the Content relation property in the Sponsors database.',
        type: 'relation',
        relation: {
          database_id: 'e8fd34fd-8a0b-456d-a53f-88ebb69553b7',
          type: 'dual_property',
          dual_property: { synced_property_name: 'Content', synced_property_id: '_QJt' }
        }
      },
      'Row Updated': {
        id: 'nZtv',
        name: 'Row Updated',
        description: 'The date and time that this page was last updated.',
        type: 'last_edited_time',
        last_edited_time: {}
      },
      Comments: {
        id: 'ndUm',
        name: 'Comments',
        description: 'The number of comments this piece of content has gained.\n' +
          '\n' +
          'You can input this data manually, or pull it in via APIs such as the YouTube Data API.',
        type: 'number',
        number: { format: 'number' }
      },
      'Edit Stage': {
        id: 't%5CWS',
        name: 'Edit Stage',
        description: 'Useful for tracking editing stages for video projects that are set to Editing in the main Status property.\n' +
          '\n' +
          'See the Edit Bay page to learn more.\n' +
          '\n' +
          'Unlock the Content database to add more options.',
        type: 'status',
        status: {
          options: [
            {
              id: '9c6c13e5-aedc-46fa-a93f-ad973be92557',
              name: 'To Ingest',
              color: 'yellow',
              description: 'The initial stage of the edit, when footage needs to be ingested (offloaded to editing workstation or server). Proxies can optionally be made.'
            },
            {
              id: '0639e01c-8dca-4834-9e02-25b87a7d2eb7',
              name: 'Assembly',
              color: 'blue',
              description: 'Clips are being trimmed down and marked as usable or thrown out.'
            },
            {
              id: 'Qfo_',
              name: 'Rough Cut',
              color: 'blue',
              description: 'The initial cut is done during this stage. For YouTube videos, this will often be the "A-roll Cut" or "Talking Head Cut".\n' +
                '\n' +
                'If separate VFX/Sound teams will be working on this while cutting is happening, feel free to skip directly from Rough to Final.'
            },
            {
              id: '\\TC<',
              name: 'VFX',
              color: 'blue',
              description: 'Visual effects, motion graphics, and animations are created and brought into the video at this stage.'
            },
            {
              id: 'pOmc',
              name: 'SFX & Music',
              color: 'blue',
              description: 'In this stage, sound effects are added to the video. Background music is also selected and added in – or scoring is done.'
            },
            {
              id: 'Ld>m',
              name: 'Color Grading',
              color: 'blue',
              description: "In this stage, color grading is added to any shots that need grading in order to achieve the video's intended look and mood."
            },
            {
              id: 'BL\\L',
              name: 'Final Cut',
              color: 'blue',
              description: "During this stage, the video's final cut is done."
            },
            {
              id: '8b7ea0e3-d391-46b8-abf5-20030204d3c4',
              name: 'Edit Locked',
              color: 'green',
              description: 'At this point, the edit is done (or "locked") and the video is ready to be uploaded and scheduled for publishing.'
            }
          ],
          groups: [
            {
              id: '762e0840-b062-4526-9c3a-a44de979fc1f',
              name: 'To-do',
              color: 'gray',
              option_ids: [ '9c6c13e5-aedc-46fa-a93f-ad973be92557' ]
            },
            {
              id: '9bf4bcff-e94c-41ff-889b-b620027aaa6e',
              name: 'In progress',
              color: 'blue',
              option_ids: [
                'BL\\L',
                '0639e01c-8dca-4834-9e02-25b87a7d2eb7',
                'Qfo_',
                '\\TC<',
                'pOmc',
                'Ld>m'
              ]
            },
            {
              id: '5ae64a80-edf9-4dc1-a0aa-dac72d1d63b4',
              name: 'Complete',
              color: 'green',
              option_ids: [ '8b7ea0e3-d391-46b8-abf5-20030204d3c4' ]
            }
          ]
        }
      },
      'Idea Merit': {
        id: 'zQds',
        name: 'Idea Merit',
        description: "Used in the Validation dashboard and views. If there's a particular reason this idea deserves your time investment, you can mark that reason here.\n" +
          '\n' +
          'Unlock the Content database to add new options.',
        type: 'multi_select',
        multi_select: {
          options: [
            {
              id: 'AxVE',
              name: 'Content Pillar',
              color: 'pink',
              description: 'The idea fits one of the "content pillars" – i.e. a core part of your content strategy.'
            },
            {
              id: 'Jxa]',
              name: 'Proven Topic',
              color: 'red',
              description: 'You - or other creators - have already created high-performing content around this topic or niche.'
            },
            {
              id: '[IW@',
              name: 'Trending Topic',
              color: 'yellow',
              description: 'This idea is centered around a trending/popular topic.'
            },
            {
              id: '@nfj',
              name: 'Search Volume',
              color: 'purple',
              description: "This idea's related keywords have high search volume."
            },
            {
              id: '_M{K',
              name: 'Needs to Exist',
              color: 'blue',
              description: "This idea simply needs to exist, and you don't need no stinkin' stats or fancy spreadsheets to justify it!"
            },
            {
              id: 'GTYx',
              name: 'Gut Feeling',
              color: 'green',
              description: "You've just a gut feeling that this idea will perform well."
            }
          ]
        }
      },
      Research: {
        id: '%7B%3EfJ',
        name: 'Research',
        description: 'Any research items associated with this content project.\n' +
          '\n' +
          'This Relation property connects to the Content Relation property in the Research database.',
        type: 'relation',
        relation: {
          database_id: '30b4f7b9-bd71-4818-be06-52921c80846f',
          type: 'dual_property',
          dual_property: {
            synced_property_name: 'Associated Content',
            synced_property_id: 'od%3CC'
          }
        }
      },
      Likes: {
        id: '%7BLv~',
        name: 'Likes',
        description: 'The number of likes this piece of content has gained.\n' +
          '\n' +
          'You can input this data manually, or pull it in via APIs such as the YouTube Data API.',
        type: 'number',
        number: { format: 'number' }
      },
      Status: {
        id: '%7BR~%40',
        name: 'Status',
        description: 'The current status of this content project. Use this property to see which projects are currently in the research stage, which are being edited, which are completed, etc.\n' +
          '\n' +
          'Content is Planned by default unless added in an Idea view.\n' +
          '\n' +
          'Unlock the Content database to add new options.',
        type: 'status',
        status: {
          options: [
            {
              id: 'b>cP',
              name: 'Idea',
              color: 'blue',
              description: 'All projects start in the Idea stage, unless you create them  in a specific view that forces another Status option.\n' +
                '\n' +
                'Ideas are just that – ideas. Set a project to Planned to "greenlight" it.'
            },
            {
              id: 'Oya\\',
              name: 'On Hold',
              color: 'yellow',
              description: 'Use this option for in-progress projects that you need to put on temporary hold.\n' +
                '\n' +
                'Note: You can use the Archive checkbox property to "archive" a project without fully deleting it.'
            },
            {
              id: '2f630bb4-c66f-4543-b695-dec2b68570d8',
              name: 'Planned',
              color: 'red',
              description: `Once a project goes to Planned, it's "greenlit" – you've committed to producing it.`
            },
            {
              id: 'BWsw',
              name: 'Research',
              color: 'pink',
              description: 'The research/info-gathering stage of the project.'
            },
            {
              id: '9987ada4-2b91-4a1b-b7f6-c8b52e323529',
              name: 'Writing',
              color: 'orange',
              description: 'The writing/scripting stage of the project.'
            },
            {
              id: 'NQH<',
              name: 'Review',
              color: 'yellow',
              description: "If you're working on a team, you may need to have someone review the script/outline before filming, or before publishing written content."
            },
            {
              id: 'txih',
              name: 'Recording',
              color: 'blue',
              description: 'The filming/recording stage of the project.\n' +
                '\n' +
                'Content projects in Recording will show up in the Film Queue page within Content Projects.'
            },
            {
              id: 'XOZa',
              name: 'Editing',
              color: 'purple',
              description: 'The editing stage of the project.\n' +
                '\n' +
                'Content projects in Recording will show up in the Edit Bay page within Content Projects.'
            },
            {
              id: '^@j?',
              name: 'Ready to Publish',
              color: 'blue',
              description: "When a project's final edit is finished, market Ready to Publish so final uploading and checks can be done."
            },
            {
              id: 'Gb{k',
              name: 'Needs Update',
              color: 'red',
              description: 'Use this status for projects that need regular updates – e.g. a tutorial that needs to list the latest version numbers of included software tools.'
            },
            {
              id: '0c46e641-fd29-4abb-8391-4de2953603f7',
              name: 'Completed',
              color: 'green',
              description: 'Finished, published projects.'
            }
          ],
          groups: [
            {
              id: 'c996dae2-a32a-43b9-8b9b-5d392ae4cd4c',
              name: 'To-do',
              color: 'gray',
              option_ids: [ 'b>cP', 'Oya\\' ]
            },
            {
              id: '373ab900-0048-486f-bf5b-3f0dfc606ca8',
              name: 'In progress',
              color: 'blue',
              option_ids: [
                '2f630bb4-c66f-4543-b695-dec2b68570d8',
                'BWsw',
                '9987ada4-2b91-4a1b-b7f6-c8b52e323529',
                'NQH<',
                'txih',
                'XOZa',
                '^@j?',
                'Gb{k'
              ]
            },
            {
              id: 'a7483af5-d01e-4006-b1f9-739a0a644b8e',
              name: 'Complete',
              color: 'green',
              option_ids: [ '0c46e641-fd29-4abb-8391-4de2953603f7' ]
            }
          ]
        }
      },
      Channel: {
        id: '%7DEwW',
        name: 'Channel',
        description: 'The channel this piece of content will be published under – e.g. a YouTube channel, blog, or podcast.\n' +
          '\n' +
          'This relation property connects to the Content relation property in the Channels database.',
        type: 'relation',
        relation: {
          database_id: '97348373-9939-4bf5-9739-1cc43964f1c6',
          type: 'dual_property',
          dual_property: { synced_property_name: 'Content', synced_property_id: 'qurW' }
        }
      },
      Name: {
        id: 'title',
        name: 'Name',
        description: 'The name of this content project – e.g. video, blog post podcast episode, etc.',
        type: 'title',
        title: {}
      }
    },
    parent: { type: 'page_id', page_id: '8ca82d01-6f19-4043-bd4c-cf7276138688' },
    url: 'https://www.notion.so/26d43632ae044da5853b736531b3d40b',
    public_url: null,
    archived: false,
    in_trash: false,
    request_id: '1062979b-db7a-4ff1-8abe-0ad92a4f8c7d'
  }