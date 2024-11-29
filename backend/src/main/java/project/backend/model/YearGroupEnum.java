package project.backend.model;

public enum YearGroupEnum {
    PRE_IB("PRE_IB"),
    IB_1("IB_1"),
    IB_2("IB_2");

    private final String displayName;

    YearGroupEnum(String diplayName) {
        this.displayName = diplayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}
