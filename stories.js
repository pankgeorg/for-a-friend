const story = (id, title, scenes, reflection) => ({id, title, scenes, reflection});
export const stories = [
story('intimidation', ['Μια βραδινή έξοδος','An evening out'], [
['Ένα φιλικό σου πρόσωπο έχει κανονίσει να βγει. Το ταίρι του θα προτιμούσε να μείνουν μέσα.','A friend has made plans to go out. Their partner would rather stay in.'],
['«Θα ήθελα να μείνεις, αλλά θα τα πούμε αύριο». Υπάρχει χώρος για διαφορετικές επιθυμίες.','“I’d like you to stay, but we can catch up tomorrow.” There is room for different wishes.'],
['Τώρα άλλαξε μία φράση: «Αν φύγεις, θα το μετανιώσεις». Το ίδιο βράδυ μοιάζει διαφορετικό.','Now change one sentence: “If you leave, you’ll regret it.” The same evening feels different.']],
['Τι αλλάζει όταν μια επιθυμία γίνεται απειλή; Σκέψου αν το πρόσωπο αυτό μπορεί να επιλέξει χωρίς φόβο.','What changes when a wish becomes a threat? Think about whether your friend can choose without fear.']),
story('physical-force',['Χωρίς σημάδι','Without a mark'],[
['Ένα φιλικό σου πρόσωπο σου περιγράφει έναν καβγά στο σπίτι.','A friend tells you about an argument at home.'],
['Κάποιος το έσπρωξε στον τοίχο. Μετά είπε: «Δεν έπαθες και τίποτα».','Someone shoved them against a wall. Afterwards they said: “You’re not even hurt.”'],
['Σε μια άλλη εκδοχή, εκείνος που θυμώνει απομακρύνεται και αφήνει χώρο στον άλλο να φύγει.','In another version, the person who is angry steps away and lets the other person leave.']],
['Δεν χρειάζεται να υπάρχει ορατό σημάδι για να πάρεις στα σοβαρά αυτό που περιγράφει ένα φιλικό σου πρόσωπο.','You do not need to see a mark to take what your friend describes seriously.']),
story('economic-control',['Τα κοινά έξοδα','Shared expenses'],[
['Δύο άνθρωποι προσπαθούν να περιορίσουν τα έξοδά τους. Συζητούν τι μπορεί να αλλάξει.','Two people are trying to spend less. They discuss what could change.'],
['Και οι δύο έχουν πρόσβαση στα χρήματα και λόγο στις αποφάσεις.','Both have access to the money and a say in decisions.'],
['Τώρα σκέψου: ο ένας κρατά όλο τον μισθό του άλλου και δίνει χρήματα μόνο όταν εκείνος υπακούει.','Now imagine: one takes the other’s entire income and only gives them money when they obey.']],
['Το ερώτημα δεν είναι πόσα χρήματα υπάρχουν, αλλά ποιος μπορεί να αποφασίσει και με ποια ελευθερία.','The question is not how much money there is, but who gets to decide and how freely.']),
story('unwanted-contact',['Μετά τον χωρισμό','After the breakup'],[
['Ένα φιλικό σου πρόσωπο έχει ζητήσει από το πρώην ταίρι του να σταματήσει να επικοινωνεί.','A friend has asked their ex-partner to stop contacting them.'],
['Τα μηνύματα συνεχίζονται. Το πρώην ταίρι εμφανίζεται έξω από τη δουλειά του.','The messages continue. Their ex appears outside their workplace.'],
['Σύγκρινέ το με ένα πρακτικό μήνυμα από συμφωνημένο κανάλι, με σεβασμό στην απάντηση και στα όρια.','Compare this with a practical message through an agreed channel, respecting their answer and boundaries.']],
['Το ότι μια σχέση τελείωσε δεν σημαίνει ότι ο φόβος τελείωσε. Τι θα βοηθούσε το φιλικό σου πρόσωπο να νιώσει ότι το ακούς;','A relationship ending does not mean the fear has ended. What could help your friend feel heard?']),
story('humiliation',['Οι λέξεις που μένουν','Words that stay'],[
['«Δεν συμφωνώ με την απόφασή σου», λέει ένα μέλος της οικογένειας.','“I disagree with your decision,” a family member says.'],
['Χρειάζεσαι περισσότερο πλαίσιο. Μπορεί το άλλο πρόσωπο να διαφωνήσει με ασφάλεια;','You need more context. Can the other person disagree safely?'],
['Σε μια άλλη εκδοχή, οι υποτιμητικές φράσεις επαναλαμβάνονται καθημερινά, για να φοβίσουν και να μειώσουν.','In another version, degrading remarks happen every day, intended to frighten and undermine.']],
['Παρατήρησε το μοτίβο, τον φόβο και τον χώρο που αφήνεται στον άλλο. Μια φράση δεν λέει πάντα όλη την ιστορία.','Notice the pattern, the fear and the space the other person is allowed. One sentence may not tell the whole story.']),
story('online-threats',['Πίσω από την οθόνη','Behind the screen'],[
['Ένα άτομο από τη σχολή απειλεί ένα φιλικό σου πρόσωπο στο διαδίκτυο.','Someone from college threatens a friend online.'],
['Δεν είναι σύντροφοι και δεν έχουν οικογενειακή σχέση.','They are not partners or family members.'],
['Αυτό αλλάζει το πλαίσιο. Δεν εξαφανίζει την απειλή ή την ανάγκη για υποστήριξη.','That changes the context. It does not erase the threat or the need for support.']],
['Πριν αναζητήσεις μια ετικέτα, άκου τι συμβαίνει και τι χρειάζεται το πρόσωπο αυτό.','Before looking for a label, listen to what is happening and what that person needs.']),
story('helping',['Στην άλλη πλευρά της πόρτας','On the other side of the door'],[
['Ένα νεαρό άτομο ακούει απειλές και ήχους επίθεσης στο σπίτι.','A young person hears threats and sounds of an assault at home.'],
['Ένας φίλος προτείνει να μπει ανάμεσα. Ένας άλλος να αναζητήσει βοήθεια από ασφαλές σημείο.','One friend suggests stepping between them. Another suggests seeking help from a safe place.'],
['Η ευθύνη για τη βία ανήκει σε εκείνον που την ασκεί. Το νεαρό άτομο δεν χρειάζεται να γίνει μεσολαβητής.','Responsibility for violence belongs to the person using it. The young person does not have to become a mediator.']],
['Πώς μπορείς να σταθείς δίπλα σε κάποιον χωρίς να του ζητήσεις να θέσει τον εαυτό του σε κίνδυνο;','How can you stand beside someone without asking them to put themselves in danger?'])
];
