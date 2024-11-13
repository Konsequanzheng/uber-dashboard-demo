# Uber dashboard demo

This is a demo dashboard for Uber built with React/Next.js, TypeScript, Shadcn, and Tailwind CSS, with data hosted on Supabase.
It utilizes the synthetic [Urban Mobility Dataset](https://www.kaggle.com/datasets/arnavsmayan/urban-mobility-dataset) from Kaggle and updates every hour to show the next hour of data.

You can find a live demo [here](https://uber-demo.quan.codes/).

## TODOS:

- [x] Add modal explaining the app on page open
- [x] Add buttons to go back/forward in time
- [x] Optimize queries (use only one query for all data)
- [x] Improve chart loading state (reduce pop-in using suspense)
- [x] Fix data outliers (Snow at 30°C, etc.) -> fixed in Supabase
- [ ] Get an interview with Uber? ;)
