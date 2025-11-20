# Pawsitive Learning Journey 🐶🎓

**Pawsitive Learning Journey** is an AI-powered learning platform designed to build a deep **emotional connection** between the learner and their goals. By pairing professional curriculum generation with a virtual companion that relies on your study consistency for care, the app fosters a unique sense of **responsibility and achievement**. Your continuous learning directly impacts your companion's well-being, transforming daily study habits into a rewarding, shared journey.


## 🧠 Why It Works: The Psychology of Care

Our design is not just for fun—it's rooted in behavioral psychology.

**The Trend of Nurturing Games:**
Games centered around growing virtual pets or plants/trees are a significant and growing trend, particularly within the mobile and simulation game markets. Unlike traditional leaderboards which can be discouraging, "nurturing" mechanics leverage our innate desire to care for others. 

Apps like *Forest* (growing trees by staying focused) or *Tamagotchi* prove that users are far less likely to break a good habit if it negatively affects a virtual companion they have bonded with.
---

## 🔮 Future vision: Real-World Impact

We believe motivation grows when it serves a purpose larger than oneself. 

**Integration with Real-World Charity:**  
We aim to bridge the gap between virtual achievement and physical aid. In future updates, we envision a system where completing milestones directly supports real animal shelters. For example:
> "If a learner completes 5 full curriculums, Coursera (or corporate partners) could donate $100 to a local animal shelter."

This creates a powerful **win-win situation**: The learner gains valuable professional knowledge, and society gets better through tangible support for animals in need. It transforms studying from a solitary task into a socially impactful action.

---
## How it works: 

## 🌟 Happy Paths (User Workflows)

Use these specific workflows to test the different capabilities of the application.

### Path 1: The "Market" Static Path 
*   **Inputs:** Enter "Digital Marketing" or just "Market" in the Primary Career Goal field, example: "I want to be a marketing content creator.".
*   In Professional Background input box, Enter sentence like: "I am a student and looking for a job."
*   **Result:** The app will use curation builder (URL:https://github.com/webedx-spark/service-definitions/blob/414c43950a94f1a6f67ca1576fd4c63a613ccc79/coursera/graphql/curationbuilder/schema/curation_builder_mutations.graphqls#L32) and loads a curated **"Generative AI Content Creation"** courses.

### Path 2: The "Data Scientist" Path 
*   **Goal:** Enter "Data Scientist", "Data Analyst", or "Data Engineer" in the onboarding goal field.
*   **Result:** Loads the deep-dive **"Generative AI for Data Scientists"** curriculum.
*   **Why test this?** To view a complex, multi-unit course structure with specialized technical content.

### Path 3: The Gamification Loop
1.  **Start:** You begin with **3 Bones**.
2.  **Feed:** Click "Feed" on the dashboard companion widget. Bones decrease by 1.
3.  **Deplete:** Feed until you reach 0 Bones. The Mascot image changes to the "No Food" state (`noFood.png`).
4.  **Earn:** Complete a Lesson (Finish the quiz). You earn **+2 Bones**.
5.  **Level Up:** Feed the dog a total of **5 times**.
    *   *Result:* A Level Up modal appears, the Mascot grows (scales up), and confetti triggers.

---

## 🦴 Economy Rules

*   **Initial State:** 3 Bones.
*   **Lesson Complete:** +2 Bones.
*   **Feeding:** -1 Bone.
*   **Level Up:** Occurs after feeding 5 bones.
*   **Assessment Lives:** You have 2 Hearts. If you fail a question twice, you must restart the assessment (no bones awarded).