import sys

# ===== Attendance Calculation =====

def calculate_needed_classes(current_percent, target_percent, week_sequence):

    theory_needed = 0
    lab_needed = 0
    percent = current_percent

    index = 0

    while percent < target_percent:

        period = week_sequence[index]

        if period == "L":
            percent += 0.29
            lab_needed += 1
        else:
            percent += 0.12
            theory_needed += 1

        index += 1

        if index == len(week_sequence):
            index = 0

    return theory_needed, lab_needed, round(percent, 2)


# ===== Main Program =====

print("========== ATTENDANCE PLANNER ==========\n")

while True:  # Timetable Loop

    print("\nEnter your weekly timetable for 6 days (5 periods/day)")
    print("Use T for Theory and L for Lab")
    print("Example: T T L T L\n")

    timetable = []

    for day in range(1, 7):

        while True:

            day_input = input(
                f"Day {day} periods (5 periods): "
            ).split()

            if len(day_input) != 5:
                print("Please enter exactly 5 periods.")
                continue

            day_input = [p.upper() for p in day_input]

            if not all(p in ["T", "L"] for p in day_input):
                print("Only T and L are allowed.")
                continue

            timetable.extend(day_input)
            break

    print("\nTimetable saved successfully!")

    while True:  # Calculation Loop

        try:
            current = float(
                input("\nEnter current attendance %: ")
            )

            target_input = input(
                "Enter target attendance % (default 75): "
            ).strip()

            target = float(target_input) if target_input else 75

            day_order = int(
                input("Enter starting day order (1-6): ")
            )

        except ValueError:
            print("Invalid input.")
            continue

        if day_order < 1 or day_order > 6:
            print("Day order must be between 1 and 6.")
            continue

        start_index = (day_order - 1) * 5

        week_sequence = (
            timetable[start_index:]
            + timetable[:start_index]
        )

        theory_needed, lab_needed, final_percent = (
            calculate_needed_classes(
                current,
                target,
                week_sequence
            )
        )

        total_classes = theory_needed + lab_needed

        print("\n========== ATTENDANCE PREDICTION ==========")
        print(f"Current Attendance : {current}%")
        print(f"Target Attendance  : {target}%")
        print(f"Starting Day Order : {day_order}")

        print("\nClasses Required:")
        print(f"Theory Classes : {theory_needed}")
        print(f"Lab Classes    : {lab_needed}")
        print(f"Total Classes  : {total_classes}")

        print(
            f"\nExpected Attendance : {final_percent}%"
        )
        print("==========================================")

        again = input(
            "\nDo another calculation? (Y/N): "
        ).strip().upper()

        if again != "Y":
            break

    restart = input(
        "\nChange timetable? (Y/N): "
    ).strip().upper()

    if restart != "Y":
        print("\nProgram Closed.")
        sys.exit()
