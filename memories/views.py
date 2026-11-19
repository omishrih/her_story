from django.shortcuts import render, redirect
from django.http import Http404

# Structured diary pages data featuring all uploaded memories
DIARY_PAGES = {
    1: {
        'chapter': 'Dedication',
        'title': 'To My Best Friend, Sadnya ❤️',
        'subtitle': 'A tribute written from the heart',
        'image_path': 'sadnya/dedication.jpeg',
        'photo_caption': 'Dedicated to Sadnya',
        'paragraphs': [
            "This book is dedicated to my best friend, who has seen my ups and downs and has still stood beside me.",
            "Some people become an important part of our lives without even realizing how special they are.",
            "Some friendships are not planned. They simply happen, and slowly, without us noticing, those people become an important part of our everyday lives.",
            "This little book is my way of appreciating one such person.",
            "Every page here is written to celebrate you, your personality, your strength, your beautiful heart, and all the little things that make you who you are.",
            "I may not always express everything through words, but I hope these pages help you understand how much I appreciate having you in my life.",
        ],
        'signature': 'Written with love,\n\nOP ❤️',
        'quote': None,
    },
    2: {
        'chapter': 'Chapter 1',
        'title': 'Sadnya — A Name Full of Energy',
        'subtitle': 'Confidence, determination, and a heart full of warmth',
        'image_path': 'sadnya/sadnya-portrait.jpg',
        'photo_caption': 'Her strength and beautiful energy',
        'paragraphs': [
            "Her name, Sadnya, represents confidence, energy, determination, and an attitude that never gives up.",
            "She is a strong girl who does not easily accept defeat. When things become challenging, she carries the inner courage and resolve to face difficulties head-on instead of stepping back.",
            "She is a visionary leader. She thinks ahead, has her own unique perspective, and carries an attitude that makes her truly stand apart from the crowd.",
            "One of the most beautiful things about her is how much she loves helping people. She cannot easily watch someone feeling sad — if she notices somebody upset, she immediately tries her best to comfort them and make them smile again.",
            "She has a genuinely caring and warm nature that makes people feel comfortable and safe around her.",
            "She works tirelessly for her future and is deeply serious and focused on building a successful, fulfilling career.",
            "Standing at approximately 5 feet tall, looking beautiful wearing her glasses, she carries herself with natural grace. But what makes her truly remarkable is that her personality and inner heart are even more beautiful than her appearance. Her confidence and warmth make her stand out wherever she goes.",
        ],
        'signature': None,
        'quote': "Never forget, Sadnya, the world needs more people with your kind of strength, kindness, and beautiful energy. ❤️",
    },
    3: {
        'chapter': 'Chapter 2',
        'title': 'Those Beautiful College Days',
        'subtitle': 'Memories, laughter, and an unexpected friendship',
        'image_path': 'sadnya/college-memories.jpg',
        'photo_caption': 'Treasured college memories',
        'paragraphs': [
            "Those college years gave us countless beautiful memories. We shared moments, conversations, endless laughter, and everyday experiences that slowly and quietly made our friendship stronger. Even though college days keep moving forward, some friendships remain timeless.",
            "I always noticed how seriously you worked towards your studies. You were focused on building a good career and creating a better future for yourself. Your dedication and determination are things that will always inspire me.",
            "Sadnya, you are one of those rare people who made me realize that such wonderful, genuine friendships are possible. In my personal experience, you were the first girl I ever became this close to as a friend. And honestly, you were never just someone I knew from college — you became a genuinely wonderful, irreplaceable companion in my life. You were supportive, understanding, caring, and someone with whom I could share so many things. I had never expected that I would become this close to someone, but sometimes the best friendships happen unexpectedly.",
        ],
        'signature': None,
        'quote': "May our friendship continue like this for years to come. May we always support each other, celebrate each other's achievements, share our happiness, and stand beside each other through every difficulty. College gave us many memories, but the greatest gift it gave me was your friendship. And I genuinely hope this friendship stays just as beautiful in all the years ahead. ❤️",
    },
    4: {
        'chapter': 'Chapter 3',
        'title': 'That Traditional Day Grace',
        'subtitle': 'A look that will always remain unforgettable',
        'image_path': 'sadnya/college-traditional-day1.jpg',
        'photo_caption': 'Graceful in saree on Traditional Day',
        'paragraphs': [
            "Sadnya, do you remember our college traditional day? You came wearing a saree, and honestly, you looked absolutely beautiful.",
            "There was something so special, elegant, and graceful about how you carried yourself that day. The way you smiled, the traditional attire, and the quiet confidence you radiated made everyone take notice.",
            "That day is firmly etched in my mind as one of those little college memories that I would love to hold onto forever. You proved that grace and strength can effortlessly walk hand in hand.",
        ],
        'signature': None,
        'quote': "Some memories never fade; they just become more precious with every passing year. ✨",
    },
    5: {
        'chapter': 'Chapter 4',
        'title': 'The Funniest Memories Together',
        'subtitle': 'Laughter, silly faces, and unscripted joy',
        'image_path': 'sadnya/funny_face.jpg',
        'photo_caption': 'Never lose that goofy smile!',
        'paragraphs': [
            "Behind all the hard work, ambition, and serious goals, there is this adorably funny, carefree, and playful side of you that makes being around you so much fun.",
            "From making spontaneous funny faces to teasing each other over the smallest things, you know exactly how to lighten the mood and turn an ordinary moment into something hilarious.",
            "Friendship is best measured not just by the serious conversations we share, but by how easily we can laugh together without caring about the rest of the world.",
        ],
        'signature': None,
        'quote': "A day without laughing with your best friend is truly a day wasted! 😄❤️",
    },
    6: {
        'chapter': 'Chapter 5',
        'title': 'Little Moments, Big Memories',
        'subtitle': 'The bond that grew stronger every day',
        'image_path': 'sadnya/friendship-memories.jpg',
        'photo_caption': 'A friendship to cherish forever',
        'paragraphs': [
            "Sometimes the smallest, simplest moments end up taking the biggest space in our hearts. A quick chat between classes, walking together, sharing advice, or simply listening when the other needed to vent.",
            "Through every semester and every challenge, you remained the one constant person who brought reassurance and honesty into my life.",
            "Our friendship wasn't built on grand promises; it was built on daily kindness, genuine respect, and being there through thick and thin.",
        ],
        'signature': None,
        'quote': "True friendship is a quiet blessing that makes life so much richer. 🌸",
    },
    7: {
        'chapter': 'Chapter 6',
        'title': 'One Day, Your Bullet Dream Will Come True! 🏍️',
        'subtitle': 'A promise for the open road',
        'image_path': 'sadnya/bulletriding1.jpg',
        'photo_caption': 'Your Bullet ride is waiting!',
        'is_bullet': True,
        'paragraphs': [
            "I know riding a Bullet has always been one of your dreams. And I want you to know something – one day, we are definitely going to make that dream come true.",
            "I promise I'll teach you how to ride a Bullet bike, step by step. From learning how to balance it to handling the clutch, changing gears and confidently riding on the road, I'll be right there with you.",
            "Don't worry about making mistakes or being nervous in the beginning. Everyone starts somewhere!",
            "One day, I want to see you riding your own Bullet with confidence, a big smile on your face and that feeling of freedom you've always dreamed about.",
            "And trust me, you won't just learn to ride – you'll become an amazing and confident rider.",
            "<strong>Your Bullet dream is not just a dream anymore. It's something we are definitely going to make happen!</strong>",
            "Until then, keep dreaming. Your riding lessons are waiting! ❤️",
        ],
        'signature': None,
        'quote': "The open road, the engine's heartbeat, and a dream waiting to be conquered! 🏍️✨",
    },
    8: {
        'chapter': 'Chapter 7',
        'title': 'A Letter for Tomorrow',
        'subtitle': 'Wishes, dreams, and endless gratitude',
        'image_path': 'sadnya/friendship.jpeg',
        'photo_caption': 'To new chapters and everlasting bonds',
        'paragraphs': [
            "As you celebrate another wonderful year, I wish you endless happiness, remarkable achievements, and the fulfillment of every ambition you set your heart upon.",
            "Thank you for being the incredible person, the steadfast support, and the wonderful best friend that you are every single day.",
            "May your journey ahead be filled with opportunities that match your immense potential, people who appreciate your genuine worth, and adventures that bring you endless joy.",
        ],
        'signature': 'Always your best friend,\n\nOP ❤️',
        'quote': "May your journey ahead be as bright and extraordinary as your smile. ✨",
    },
    9: {
        'chapter': 'Chapter 8 • A Lifetime Promise',
        'title': "I'm Here for You...!! ❤️🥺",
        'subtitle': 'A promise written for a lifetime',
        'image_path': 'sadnya/here-for-you.jpg',
        'photo_caption': 'Forever by your side ♡',
        'paragraphs': [
            "If you ever get upset, <span class=\"pink-highlight\">I'm here to make you smile.</span>",
            "If you ever lose your way, <span class=\"pink-highlight\">I'm here to help you find yourself again.</span>",
            "If you ever smile, <span class=\"pink-highlight\">I'm here to make you win.</span>",
            "If you ever feel tired, <span class=\"pink-highlight\">I'm here to take care of you.</span>",
            "And whenever darkness surrounds your world,<br><span class=\"pink-highlight\">I'm here to become your light and shine for you...</span>",
            "Even if a thousand challenges stand before us,<br><span class=\"pink-highlight\">I'll always be there to fight the whole world for you.</span>",
            "Because no matter what happens,<br>I'm not here to walk away from your side,<br><span class=\"pink-highlight-strong\">I'm here to stay by your side,<br>not just for a moment, but for a lifetime... ❤️🫶</span>",
        ],
        'signature': 'Always here for you — OP ❤️',
        'quote': None,
    },
    10: {
        'chapter': 'Final Page • From the Heart',
        'title': 'One Last Thing... ❤️',
        'subtitle': 'A closing note for Sadnya',
        'image_path': 'sadnya/dedication.jpeg',
        'photo_caption': 'Forever grateful for our friendship ♡',
        'is_final': True,
        'decorative_line': 'The End... or just another beginning? ♡',
        'paragraphs': [
            "If you feel anything after reading all these pages, if even one line made you smile or brought back a memory, then tell me.",
            "I'll be waiting to hear what you felt.",
            "No matter what your reaction is, I hope this little book brought a smile to your face.",
        ],
        'signature': 'With lots of love,\n\n— OP ❤️',
        'quote': None,
    },
}

TOTAL_PAGES = len(DIARY_PAGES)


def home(request):
    """Render the enhanced homepage with all visual memory sections."""
    context = {
        'total_book_pages': TOTAL_PAGES,
    }
    return render(request, 'home.html', context)


def book_view(request, page=0):
    """
    Handle the vintage diary book navigation:
    - /book/ (page=0): Book cover
    - /book/1/ .. /book/10/: Diary pages
    - Invalid pages: Redirect gracefully to /book/
    """
    if page == 0:
        return render(request, 'book_cover.html', {
            'total_pages': TOTAL_PAGES,
        })
    
    if page in DIARY_PAGES:
        data = DIARY_PAGES[page]
        context = {
            'page_num': page,
            'total_pages': TOTAL_PAGES,
            'page_range': list(range(1, TOTAL_PAGES + 1)),
            'chapter': data['chapter'],
            'title': data['title'],
            'subtitle': data.get('subtitle', ''),
            'image_path': data['image_path'],
            'photo_caption': data.get('photo_caption', 'Photograph for Sadnya'),
            'paragraphs': data['paragraphs'],
            'signature': data.get('signature'),
            'quote': data.get('quote'),
            'decorative_line': data.get('decorative_line'),
            'is_final': data.get('is_final', False),
            'is_bullet': data.get('is_bullet', False),
            'prev_page': page - 1,
            'next_page': page + 1 if page < TOTAL_PAGES else None,
            'has_prev': True,
            'has_next': page < TOTAL_PAGES,
        }
        return render(request, 'page.html', context)
    
    # If page is out of bounds, redirect to book cover
    return redirect('book_cover')
