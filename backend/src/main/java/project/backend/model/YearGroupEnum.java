package project.backend.model;

public enum YearGroupEnum {
    PRE_IB("PRE-IB"),
    IB1("IB1"),
    IB2("IB2");

    private final String displayName;

    YearGroupEnum(String diplayName){
        this.displayName = diplayName;
    }

    public String getDisplayName(){
        return displayName;
    }

    @Override
    public String toString(){
        return displayName;
    }
}
